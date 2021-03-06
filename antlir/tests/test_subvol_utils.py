#!/usr/bin/env python3
# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

import os
import subprocess
import tempfile
import unittest
import unittest.mock

from antlir.btrfs_diff.tests.demo_sendstreams_expected import (
    render_demo_as_corrupted_by_gnu_tar,
    render_demo_subvols,
)

from ..find_built_subvol import subvolumes_dir, volume_dir
from ..fs_utils import Path, temp_dir
from ..subvol_utils import Subvol, SubvolOpts
from .subvol_helpers import render_subvol
from .temp_subvolumes import with_temp_subvols


class SubvolTestCase(unittest.TestCase):
    """
    NB: The test here is partially redundant with demo_sendstreams, but
    coverage easier to manage when there's a clean, separate unit test.
    """

    def setUp(self):  # More output for easier debugging
        unittest.util._MAX_LENGTH = 12345
        self.maxDiff = 12345

    @with_temp_subvols
    def test_create_and_snapshot_and_already_exists(self, temp_subvols):
        p = temp_subvols.create("parent")
        p2 = Subvol(p.path(), already_exists=True)
        self.assertEqual(p.path(), p2.path())
        temp_subvols.snapshot(p2, "child")

    def test_does_not_exist(self):
        with tempfile.TemporaryDirectory() as td:
            with self.assertRaisesRegex(AssertionError, "No btrfs subvol"):
                Subvol(td, already_exists=True)

            sv = Subvol(td)
            with self.assertRaisesRegex(AssertionError, "exists is False"):
                sv.run_as_root(["true"])

    def test_out_of_subvol_symlink(self):
        with temp_dir() as td:
            os.symlink("/dev/null", td / "my_null")
            self.assertEqual(
                td / "my_null",
                Subvol(td).path("my_null", no_dereference_leaf=True),
            )
            with self.assertRaisesRegex(AssertionError, " is outside of "):
                Subvol(td).path("my_null")

    def test_run_as_root_no_cwd(self):
        sv = Subvol("/dev/null/no-such-dir")
        sv.run_as_root(["true"], _subvol_exists=False)
        with self.assertRaisesRegex(AssertionError, "cwd= is not permitte"):
            sv.run_as_root(["true"], _subvol_exists=False, cwd=".")

    def test_run_as_root_return(self):
        args = ["bash", "-c", "echo -n my out; echo -n my err >&2"]
        r = Subvol("/dev/null/no-such-dir").run_as_root(
            args,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            _subvol_exists=False,
        )
        self.assertEqual(["sudo", "TMP=", "--"] + args, r.args)
        self.assertEqual(0, r.returncode)
        self.assertEqual(b"my out", r.stdout)
        self.assertEqual(b"my err", r.stderr)

    def test_path(self):
        # We are only going to do path manipulations in this test.
        sv = Subvol("/subvol/need/not/exist")

        for bad_path in ["..", "a/../../b/c/d", "../c/d/e"]:
            with self.assertRaisesRegex(AssertionError, "is outside of"):
                sv.path(bad_path)

        self.assertEqual(sv.path("a/b"), sv.path("/a/b/"))

        self.assertEqual(b"a/b", sv.path("a/b").relpath(sv.path()))

        self.assertTrue(not sv.path(".").endswith(b"/."))

    def test_canonicalize_path(self):
        with temp_dir() as td:
            with unittest.mock.patch(
                "antlir.subvol_utils._path_is_btrfs_subvol",
                unittest.mock.Mock(side_effect=[True]),
            ):
                sv = Subvol(td, already_exists=True)
            os.mkdir(td / "real")
            (td / "real/file").touch()
            os.symlink("real/file", td / "indirect1")
            os.mkdir(td / "indirect2")
            os.symlink("../indirect1", td / "indirect2/link")
            self.assertEqual(
                b"/real/file", sv.canonicalize_path("indirect2/link")
            )
            self.assertEqual(b"/", sv.canonicalize_path("./."))

    def test_delete_inner_subvols(self):
        volume_tmp_dir = os.path.join(volume_dir(), "tmp")
        try:
            os.mkdir(volume_tmp_dir)
        except FileExistsError:
            pass
        with temp_dir(dir=volume_tmp_dir, prefix="delete_recursive") as td:
            try:
                outer = Subvol(td / "outer")
                outer.create()
                inner1 = Subvol(td / "outer/inner1")
                inner1.create()
                inner2 = Subvol(td / "outer/inner1/inner2")
                inner2.create()
                inner3 = Subvol(td / "outer/inner3")
                inner3.create()

                with self.assertRaises(subprocess.CalledProcessError):
                    outer.delete()

                outer._delete_inner_subvols()
                self.assertEqual([], outer.path().listdir())
                outer.delete()
                self.assertEqual([], td.listdir())
            except BaseException:  # Clean up even on Ctrl-C
                try:
                    inner2.delete()
                finally:
                    try:
                        inner1.delete()
                    finally:
                        try:
                            inner3.delete()
                        finally:
                            outer.delete()
                raise

    @with_temp_subvols
    def test_run_as_root_input(self, temp_subvols):
        sv = temp_subvols.create("subvol")
        sv.run_as_root(["tee", sv.path("hello")], input=b"world")
        with open(sv.path("hello")) as infile:
            self.assertEqual("world", infile.read())

    @with_temp_subvols
    def test_mark_readonly_and_get_sendstream(self, temp_subvols):
        sv = temp_subvols.create("subvol")
        sv.run_as_root(["touch", sv.path("abracadabra")])
        sendstream = sv.mark_readonly_and_get_sendstream()
        self.assertIn(b"abracadabra", sendstream)
        with tempfile.TemporaryFile() as outfile:
            with sv.mark_readonly_and_write_sendstream_to_file(outfile):
                pass
            outfile.seek(0)
            self.assertEqual(sendstream, outfile.read())

    @with_temp_subvols
    def _test_mark_readonly_and_send_to_new_loopback(
        self, temp_subvols, multi_pass_size_minimization
    ):
        subvol_opts = SubvolOpts(
            multi_pass_size_minimization=multi_pass_size_minimization
        )
        sv = temp_subvols.create("subvol")
        sv.run_as_root(
            [
                "dd",
                "if=/dev/urandom",
                b"of=" + sv.path("d"),
                "bs=1M",
                "count=600",
            ]
        )
        sv.run_as_root(["mkdir", sv.path("0")])
        sv.run_as_root(["tee", sv.path("0/0")], input=b"0123456789")
        with tempfile.NamedTemporaryFile() as loop_path:
            # The default waste factor succeeds in 1 try, but a too-low
            # factor results in 2 tries.
            waste_too_low = 1.00015
            self.assertEqual(
                2,
                sv.mark_readonly_and_send_to_new_loopback(
                    loop_path.name,
                    subvol_opts=subvol_opts,
                    waste_factor=waste_too_low,
                ),
            )
            self.assertEqual(
                1,
                sv.mark_readonly_and_send_to_new_loopback(
                    loop_path.name, subvol_opts=subvol_opts
                ),
            )
            # Same 2-try run, but this time, exercise the free space check
            # instead of relying on parsing `btrfs receive` output.
            with unittest.mock.patch.object(
                Subvol, "_OUT_OF_SPACE_SUFFIX", b"cypa"
            ):
                self.assertEqual(
                    2,
                    sv.mark_readonly_and_send_to_new_loopback(
                        loop_path.name,
                        subvol_opts=subvol_opts,
                        waste_factor=waste_too_low,
                    ),
                )

    def test_mark_readonly_and_send_to_new_loopback(self):
        self._test_mark_readonly_and_send_to_new_loopback(
            multi_pass_size_minimization=False
        )

    def test_mark_readonly_and_send_to_new_loopback_with_multi_pass(self):
        self._test_mark_readonly_and_send_to_new_loopback(
            multi_pass_size_minimization=True
        )

    @with_temp_subvols
    def test_mark_readonly_and_send_to_new_loopback_writable(
        self, temp_subvols
    ):
        # `test_package_image_as_btrfs_loopback_writable` actually
        # tests that the subvolume is writable, here we just test that
        # the subvol util helper method works
        sv = temp_subvols.create("subvol")
        sv.run_as_root(
            ["dd", "if=/dev/zero", b"of=" + sv.path("d"), "bs=1M", "count=200"]
        )
        sv.run_as_root(["mkdir", sv.path("0")])
        sv.run_as_root(["tee", sv.path("0/0")], input=b"0123456789")
        with tempfile.NamedTemporaryFile() as loop_path:
            self.assertEqual(
                1,
                sv.mark_readonly_and_send_to_new_loopback(
                    loop_path.name, subvol_opts=SubvolOpts(readonly=False)
                ),
            )

    @with_temp_subvols
    def test_mark_readonly_and_send_to_new_loopback_seed_device(
        self, temp_subvols
    ):
        # `test_package_image_as_btrfs_seed_device` actually
        # tests that the resulting image has the SEEDING flag set, here we just
        # test that the subvol util helper method works
        sv = temp_subvols.create("subvol")
        sv.run_as_root(
            ["dd", "if=/dev/zero", b"of=" + sv.path("d"), "bs=1M", "count=200"]
        )
        sv.run_as_root(["mkdir", sv.path("0")])
        sv.run_as_root(["tee", sv.path("0/0")], input=b"0123456789")
        with tempfile.NamedTemporaryFile() as loop_path:
            self.assertEqual(
                1,
                sv.mark_readonly_and_send_to_new_loopback(
                    loop_path.name,
                    subvol_opts=SubvolOpts(readonly=False, seed_device=True),
                ),
            )

    @with_temp_subvols
    def test_receive(self, temp_subvols):
        new_subvol_name = "differs_from_create_ops"
        sv = temp_subvols.caller_will_create(new_subvol_name)
        with open(
            Path(__file__).dirname() / "create_ops.sendstream"
        ) as f, sv.receive(f):
            pass
        self.assertEqual(
            render_demo_subvols(create_ops=new_subvol_name), render_subvol(sv)
        )

    @with_temp_subvols
    def test_write_to_tarball(self, temp_subvols):
        # create a subvol from a demo sendstream, tar it, untar into a new
        # subvol, then compare the two
        demo_sv_name = "demo_sv"
        demo_sv = temp_subvols.caller_will_create(demo_sv_name)
        with open(
            Path(__file__).dirname() / "create_ops.sendstream"
        ) as f, demo_sv.receive(f):
            pass

        unpacked_sv = temp_subvols.create("subvol")
        with tempfile.NamedTemporaryFile() as tar_file:
            with demo_sv.write_tarball_to_file(tar_file):
                pass

            demo_sv.run_as_root(
                [
                    "tar",
                    "xf",
                    tar_file.name,
                    "--xattrs",
                    "-C",
                    unpacked_sv.path(),
                ]
            )

        demo_render = render_demo_as_corrupted_by_gnu_tar(
            create_ops=demo_sv_name
        )

        self.assertEqual(demo_render, render_subvol(unpacked_sv))

    @with_temp_subvols
    def test_equal_and_hash(self, temp_subvols):
        sv = temp_subvols.create("subvol")
        other_sv = Subvol(sv.path(), already_exists=True)

        self.assertEqual(sv, other_sv)
        self.assertEqual(sv.__hash__(), hash(sv._path))
