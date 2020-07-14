#!/usr/bin/env python3
# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

import subprocess
import sys

from fs_image.fs_utils import Path
from fs_image.rpm.yum_dnf_conf import YumDnf
from fs_image.tests.temp_subvolumes import TempSubvolumes

from ..rpm_action import RpmAction, RpmActionItem
from .common import DUMMY_LAYER_OPTS, render_subvol


class RpmActionItemTestBase:
    def _check_rpm_action_item_build_appliance(self, ba_path: Path):
        for preserve_yum_dnf_cache in [True, False]:
            self._check_rpm_action_item(
                layer_opts=DUMMY_LAYER_OPTS._replace(
                    build_appliance=ba_path,
                    preserve_yum_dnf_cache=preserve_yum_dnf_cache,
                    rpm_installer=self._YUM_DNF,
                )
            )

    def _check_rpm_action_item(self, layer_opts):
        with TempSubvolumes(sys.argv[0]) as temp_subvolumes:
            subvol = temp_subvolumes.create("rpm_action")
            self.assertEqual(["(Dir)", {}], render_subvol(subvol))

            # The empty action is a no-op
            RpmActionItem.get_phase_builder([], layer_opts)(subvol)
            self.assertEqual(["(Dir)", {}], render_subvol(subvol))

            # `yum-dnf-from-snapshot` needs a `/meta` directory to work
            subvol.run_as_root(["mkdir", subvol.path("meta")])
            self.assertEqual(
                # No `opts/artifacts_may_require_repo` here because we directly
                # created the subvol instead of using an Item.
                ["(Dir)", {"meta": ["(Dir)", {}]}],
                render_subvol(subvol),
            )

            # Specifying RPM versions is prohibited
            with self.assertRaises(subprocess.CalledProcessError):
                RpmActionItem.get_phase_builder(
                    [
                        RpmActionItem(
                            from_target="m",
                            name="rpm-test-milk-2.71",
                            source=None,
                            action=RpmAction.install,
                        )
                    ],
                    layer_opts,
                )(subvol)

            # Cannot pass both `name` and `source`
            with self.assertRaisesRegex(
                AssertionError,
                "Exactly one of `name` or `source` must be set .*",
            ):
                RpmActionItem.get_phase_builder(
                    [
                        RpmActionItem(
                            from_target="m",
                            name="rpm-test-milk",
                            source="rpm-test-milk",
                            action=RpmAction.install,
                        )
                    ],
                    layer_opts,
                )(subvol)

            RpmActionItem.get_phase_builder(
                [
                    RpmActionItem(
                        from_target="t", name=n, action=RpmAction.install
                    )
                    for n in [
                        # This specific RPM contains `/bin/sh` and a
                        # post-install script to test `/dev/null` isolation.
                        "rpm-test-milk",
                        "rpm-test-carrot",
                    ]
                ],
                layer_opts,
            )(subvol)
            # Clean up the `dnf`, `yum` & `rpm` litter before checking the
            # packages.  Maybe fixme: We end up not asserting ownership /
            # permissions / etc on directories like /var and /dev.
            subvol.run_as_root(
                [
                    "rm",
                    "-rf",
                    # Annotate all paths since `sudo rm -rf` is scary.
                    subvol.path("var/lib/rpm"),
                    subvol.path("var/lib/yum"),
                    subvol.path("var/lib/dnf"),
                    subvol.path("var/log/yum.log"),
                    *(
                        subvol.path("var/log/" + log)
                        for log in [
                            "yum.log",
                            "dnf.log",
                            "dnf.librepo.log",
                            "dnf.rpm.log",
                            "hawkey.log",
                        ]
                    ),
                    subvol.path("usr/lib/.build-id"),
                    subvol.path("bin/sh"),
                ]
            )
            if self._YUM_DNF == YumDnf.dnf:
                subvol.run_as_root(
                    [
                        "rmdir",
                        subvol.path("etc/dnf/modules.d"),
                        subvol.path("etc/dnf"),
                        subvol.path("etc"),
                    ]
                )
            # The way that `RpmActionItem` nspawns into build_appliance must
            # gurantee that `/var/cache/{dnf,yum}` is empty.  The next two
            # lines test that the cache directory is empty because `rmdir`
            # fails if it is not.  It is important that the cache of built
            # images be empty, to avoid unnecessarily increasing the
            # distributed image size.
            rm_cmd = (
                ["rmdir"]
                if (
                    layer_opts.build_appliance
                    and not layer_opts.preserve_yum_dnf_cache
                )
                else ["rm", "-rf"]
            )
            subvol.run_as_root(
                rm_cmd + [subvol.path(f"var/cache/{self._YUM_DNF.value}")]
            )
            subvol.run_as_root(
                [
                    "rmdir",
                    subvol.path("dev"),  # made by yum_dnf_from_snapshot.py
                    subvol.path("meta"),
                    subvol.path("var/cache"),
                    subvol.path("var/lib"),
                    subvol.path("var/log"),
                    subvol.path("var/tmp"),
                    subvol.path("var"),
                    subvol.path("usr/lib"),
                    subvol.path("bin"),
                ]
            )
            self.assertEqual(
                [
                    "(Dir)",
                    {
                        "rpm_test": [
                            "(Dir)",
                            {
                                "carrot.txt": ["(File d13)"],
                                "milk.txt": ["(File d12)"],
                                "post.txt": ["(File d6)"],
                            },
                        ],
                        "usr": ["(Dir)", {}],
                    },
                ],
                render_subvol(subvol),
            )
