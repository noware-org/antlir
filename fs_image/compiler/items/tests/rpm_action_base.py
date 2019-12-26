#!/usr/bin/env python3
import subprocess
import sys

from find_built_subvol import find_built_subvol
from fs_image.common import load_location
from fs_image.fs_utils import Path

from tests.temp_subvolumes import TempSubvolumes

from ..rpm_action import RpmAction, RpmActionItem

from .common import DUMMY_LAYER_OPTS, render_subvol


class RpmActionItemTestBase:

    @classmethod
    def _subvol_from_resource(cls, module, name):
        return find_built_subvol(load_location(module, name))

    def _check_rpm_action_item_build_appliance(self, ba_path: Path):
        for preserve_yum_cache in [True, False]:
            self._check_rpm_action_item(layer_opts=DUMMY_LAYER_OPTS._replace(
                build_appliance=ba_path,
                preserve_yum_cache=preserve_yum_cache,
            ), preserve_yum_cache=preserve_yum_cache)

    def _check_rpm_action_item(self, layer_opts, preserve_yum_cache=False):
        with TempSubvolumes(sys.argv[0]) as temp_subvolumes:
            subvol = temp_subvolumes.create('rpm_action')
            self.assertEqual(['(Dir)', {}], render_subvol(subvol))

            # The empty action is a no-op
            RpmActionItem.get_phase_builder([], layer_opts)(subvol)
            self.assertEqual(['(Dir)', {}], render_subvol(subvol))

            # `yum-from-snapshot` needs a `/meta` directory to work
            subvol.run_as_root(['mkdir', subvol.path('meta')])
            self.assertEqual(
                # No `opts/artifacts_may_require_repo` here because we directly
                # created the subvol instead of using an Item.
                ['(Dir)', {'meta': ['(Dir)', {}]}], render_subvol(subvol),
            )

            # Specifying RPM versions is prohibited
            with self.assertRaises(subprocess.CalledProcessError):
                RpmActionItem.get_phase_builder(
                    [RpmActionItem(
                        from_target='m',
                        name='rpm-test-milk-2.71',
                        source=None,
                        action=RpmAction.install,
                    )],
                    layer_opts,
                )(subvol)

            # Cannot pass both `name` and `source`
            with self.assertRaisesRegex(
                AssertionError,
                'Exactly one of `name` or `source` must be set .*',
            ):
                RpmActionItem.get_phase_builder(
                    [RpmActionItem(
                        from_target='m',
                        name='rpm-test-milk',
                        source='rpm-test-milk',
                        action=RpmAction.install,
                    )],
                    layer_opts,
                )(subvol)

            RpmActionItem.get_phase_builder(
                [
                    RpmActionItem(
                        from_target='t', name=n, action=RpmAction.install,
                    ) for n in [
                        # This specific RPM contains `/bin/sh` and a
                        # post-install script to test `/dev/null` isolation.
                        'rpm-test-milk',
                        'rpm-test-carrot',
                    ]
                ] + [
                    RpmActionItem(
                        from_target='t',
                        source=Path(__file__).dirname() /
                            "rpm-test-cheese-1-1.rpm",
                        action=RpmAction.install,
                    )
                ],
                layer_opts,
            )(subvol)
            # Clean up the `yum` & `rpm` litter before checking the packages.
            # Maybe fixme: As a result, we end up not asserting ownership /
            # permissions / etc on directories like /var and /dev.
            subvol.run_as_root([
                'rm', '-rf',
                # Annotate all paths since `sudo rm -rf` is scary.
                subvol.path('var/lib/rpm'),
                subvol.path('var/lib/yum'),
                subvol.path('var/log/yum.log'),
                subvol.path('usr/lib/.build-id'),
                subvol.path('bin/sh'),
            ])
            # The way that RpmActionItem invokes systemd_nspawn on
            # build_appliance must gurantee that /var/cache/yum is empty.
            # Next two lines test that the /var/cache/yum directory is empty
            # because rmdir fails if it is not.
            # It is important that the yum cache of built images be empty, to
            # avoid unnecessarily increasing the distributed image size.
            rm_cmd = ['rmdir'] if (
                layer_opts.build_appliance and not preserve_yum_cache
            ) else ['rm', '-rf']
            subvol.run_as_root(rm_cmd + [subvol.path('var/cache/yum')])
            subvol.run_as_root([
                'rmdir',
                subvol.path('dev'),  # made by yum_from_snapshot.py
                subvol.path('meta'),
                subvol.path('var/cache'),
                subvol.path('var/lib'),
                subvol.path('var/log'),
                subvol.path('var/tmp'),
                subvol.path('var'),
                subvol.path('usr/lib'),
                subvol.path('bin'),
            ])
            self.assertEqual(['(Dir)', {
                'usr': ['(Dir)', {
                    'share': ['(Dir)', {
                        'rpm_test': ['(Dir)', {
                            'carrot.txt': ['(File d13)'],
                            'cheese1.txt': ['(File d36)'],
                            'milk.txt': ['(File d12)'],
                            'post.txt': ['(File d6)'],
                        }],
                    }],
                }],
            }], render_subvol(subvol))