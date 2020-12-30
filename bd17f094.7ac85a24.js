(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{170:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return b})),n.d(t,"default",(function(){return p}));var i=n(2),a=n(10),r=(n(0),n(182)),l={id:"image",title:"Image",generated:"@generated"},o={id:"api/image",isDocsHomePage:!1,title:"Image",description:"This provides a more friendly UI to the image_* macros.",source:"@site/docs/api/gen-image.md",permalink:"/antlir/docs/api/image",editUrl:"https://github.com/facebookincubator/antlir/edit/master/website/docs/api/gen-image.md",sidebar:"docs",previous:{title:"Fetched Artifacts",permalink:"/antlir/docs/concepts/pre-built-artifacts/fetched-artifacts"},next:{title:"image.*_unittest",permalink:"/antlir/docs/runtime/nspawn-runtime/image-unittest"}},b=[{value:"<code>clone</code>",id:"clone",children:[{value:"Trailing slashes on both paths are significant",id:"trailing-slashes-on-both-paths-are-significant",children:[]},{value:"Known deviations from perfect cloning",id:"known-deviations-from-perfect-cloning",children:[]},{value:"No UID/GID remapping is attempted",id:"no-uidgid-remapping-is-attempted",children:[]},{value:"When to use this?",id:"when-to-use-this",children:[]}]},{value:"<code>cpp_unittest</code>",id:"cpp_unittest",children:[]},{value:"<code>feature</code>",id:"feature",children:[]},{value:"<code>mkdir</code>",id:"mkdir",children:[]},{value:"<code>ensure_dirs_exist</code>",id:"ensure_dirs_exist",children:[]},{value:"<code>ensure_subdirs_exist</code>",id:"ensure_subdirs_exist",children:[]},{value:"<code>install</code>",id:"install",children:[]},{value:"<code>install_buck_runnable</code>",id:"install_buck_runnable",children:[{value:"When to use <code>install_buck_runnable</code> vs <code>install</code>?",id:"when-to-use-install_buck_runnable-vs-install",children:[]}]},{value:"<code>tarball</code>",id:"tarball",children:[]},{value:"<code>remove</code>",id:"remove",children:[]},{value:"<code>rpms_install</code>",id:"rpms_install",children:[]},{value:"<code>rpms_remove_if_exists</code>",id:"rpms_remove_if_exists",children:[]},{value:"<code>symlink_dir</code>",id:"symlink_dir",children:[]},{value:"<code>symlink_file</code>",id:"symlink_file",children:[]},{value:"<code>host_dir_mount</code>",id:"host_dir_mount",children:[]},{value:"<code>host_file_mount</code>",id:"host_file_mount",children:[]},{value:"<code>layer_mount</code>",id:"layer_mount",children:[]},{value:"<code>layer</code>",id:"layer",children:[]},{value:"<code>layer_alias</code>",id:"layer_alias",children:[]},{value:"<code>package</code>",id:"package",children:[]},{value:"<code>packaged_layer</code>",id:"packaged_layer",children:[]},{value:"<code>python_unittest</code>",id:"python_unittest",children:[]},{value:"<code>sendstream_layer</code>",id:"sendstream_layer",children:[]},{value:"<code>source</code>",id:"source",children:[]},{value:"<code>test_rpm_names</code>",id:"test_rpm_names",children:[]}],c={rightToc:b};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"This provides a more friendly UI to the image_* macros."),Object(r.b)("h1",{id:"api"},"API"),Object(r.b)("h2",{id:"clone"},Object(r.b)("inlineCode",{parentName:"h2"},"clone")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"clone(src_layer, src_path, dest_path)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.clone("//path/to:src_layer", "src/path", "dest/path")')," copies a\nsubtree of an existing layer into the one under construction. To the extent\npossible, filesystem metadata are preserved."),Object(r.b)("h3",{id:"trailing-slashes-on-both-paths-are-significant"},"Trailing slashes on both paths are significant"),Object(r.b)("p",null,"The three supported cases are:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},'"s/rc" -> "dest/" creates "dest/rc"'),Object(r.b)("li",{parentName:"ul"},'"s/rc/" -> "dest/" creates "dest/(children of rc)"'),Object(r.b)("li",{parentName:"ul"},'"s/rc" -> "dest" creates "dest"')),Object(r.b)("p",null,"More explicitly:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"A trailing slash in ",Object(r.b)("inlineCode",{parentName:"li"},"src_path"),' means "use the ',Object(r.b)("inlineCode",{parentName:"li"},"rsync"),' convention":',Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"Do not clone the source directory, but only its contents."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"dest_path")," must be a pre-existing dir, and it must end in ",Object(r.b)("inlineCode",{parentName:"li"},"/")))),Object(r.b)("li",{parentName:"ul"},"Similar to ",Object(r.b)("inlineCode",{parentName:"li"},"image.symlink*"),", a trailing slash in ",Object(r.b)("inlineCode",{parentName:"li"},"dest_path")," means that\nit's a pre-existing directory (e.g.  made by ",Object(r.b)("inlineCode",{parentName:"li"},"image.mkdir"),"), and ",Object(r.b)("inlineCode",{parentName:"li"},"clone"),"\nwill only write to:",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"dest/(basename of src_path)")," if ",Object(r.b)("inlineCode",{parentName:"li"},"src_path")," lacks a trailing /"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"dest/(children of src_path)")," if ",Object(r.b)("inlineCode",{parentName:"li"},"src_path")," has a trailing /")))),Object(r.b)("h3",{id:"known-deviations-from-perfect-cloning"},"Known deviations from perfect cloning"),Object(r.b)("p",null,"Most likely, SELinux attrs change. Future: add real tests for this?"),Object(r.b)("h3",{id:"no-uidgid-remapping-is-attempted"},"No UID/GID remapping is attempted"),Object(r.b)("p",null,"We assume that ",Object(r.b)("inlineCode",{parentName:"p"},":src_layer")," has the same user/group DB as the new layer."),Object(r.b)("h3",{id:"when-to-use-this"},"When to use this?"),Object(r.b)("p",null,"Often, instead of using , you should prefer ",Object(r.b)("inlineCode",{parentName:"p"},"image.layer_mount"),", which allows\nyou to compose independent pieces of the filesystem at ",Object(r.b)("em",{parentName:"p"},"runtime"),", without\nincurring the cost of publishing images with a lot of duplicated content."),Object(r.b)("p",null,"If you're trying to copy the output of a regular Buck target, instead use\n",Object(r.b)("inlineCode",{parentName:"p"},"image.install")," or ",Object(r.b)("inlineCode",{parentName:"p"},"image.install_buck_runnable"),". These rewrite filesystem\nmetadata to a deterministic state, while the state of the on-disk metadata in\n",Object(r.b)("inlineCode",{parentName:"p"},"buck-out")," is undefined."),Object(r.b)("h2",{id:"cpp_unittest"},Object(r.b)("inlineCode",{parentName:"h2"},"cpp_unittest")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"cpp_unittest(name, layer, boot, run_as_user, visibility, hostname, container_opts, **cpp_unittest_kwargs)")),Object(r.b)("p",null,"No docstring available."),Object(r.b)("h2",{id:"feature"},Object(r.b)("inlineCode",{parentName:"h2"},"feature")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"feature(name, features, visibility, _internal_only_version_sets)")),Object(r.b)("p",null,"Turns a group of image actions into a Buck target, so it can be\nreferenced from outside the current project via ",Object(r.b)("inlineCode",{parentName:"p"},"//path/to:name"),"."),Object(r.b)("p",null,"Do NOT use this for composition within one project, just use a list."),Object(r.b)("p",null,"See the file docblock for more details on image action composition."),Object(r.b)("p",null,"See other ",Object(r.b)("inlineCode",{parentName:"p"},".bzl")," files in this directory for actions that actually build\nthe container (install RPMs, remove files/directories, create symlinks\nor directories, copy executable or data files, declare mounts)."),Object(r.b)("h2",{id:"mkdir"},Object(r.b)("inlineCode",{parentName:"h2"},"mkdir")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"mkdir(parent, dest, mode, user, group)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.mkdir("/a/b", "c/d")')," creates the directories ",Object(r.b)("inlineCode",{parentName:"p"},"c/d")," in the image\ninside the pre-existing directory ",Object(r.b)("inlineCode",{parentName:"p"},"/a/b")," --"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"parent")," is an image-absolute path, inside which the directory will be\ncreated."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"dest")," is a path relative to ",Object(r.b)("inlineCode",{parentName:"li"},"parent"),", which will be created.")),Object(r.b)("p",null,"The arguments ",Object(r.b)("inlineCode",{parentName:"p"},"parent")," and ",Object(r.b)("inlineCode",{parentName:"p"},"dest")," (",Object(r.b)("inlineCode",{parentName:"p"},"/a/b")," and ",Object(r.b)("inlineCode",{parentName:"p"},"c/d")," in the example above) are\nmandatory; ",Object(r.b)("inlineCode",{parentName:"p"},"mode"),", ",Object(r.b)("inlineCode",{parentName:"p"},"user"),", and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," are optional."),Object(r.b)("p",null,"The argument ",Object(r.b)("inlineCode",{parentName:"p"},"mode")," changes file mode bits of all directories in ",Object(r.b)("inlineCode",{parentName:"p"},"dest"),". It\ncan be an integer fully specifying the bits or a symbolic string like ",Object(r.b)("inlineCode",{parentName:"p"},"u+rx"),".\nIn the latter case, the changes are applied on top of mode 0."),Object(r.b)("p",null,"The arguments ",Object(r.b)("inlineCode",{parentName:"p"},"user")," and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," change file owner and group of all\ndirectories in ",Object(r.b)("inlineCode",{parentName:"p"},"dest"),". ",Object(r.b)("inlineCode",{parentName:"p"},"user")," and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," can be integers or symbolic strings.\nIn the latter case, the passwd/group database from the host (not from the\nimage) is used."),Object(r.b)("h2",{id:"ensure_dirs_exist"},Object(r.b)("inlineCode",{parentName:"h2"},"ensure_dirs_exist")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"ensure_dirs_exist(path, mode, user, group)")),Object(r.b)("p",null,"Equivalent to ",Object(r.b)("inlineCode",{parentName:"p"},'image.ensure_subdirs_exist("/", path, ...)'),"."),Object(r.b)("h2",{id:"ensure_subdirs_exist"},Object(r.b)("inlineCode",{parentName:"h2"},"ensure_subdirs_exist")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"ensure_subdirs_exist(into_dir, subdirs_to_create, mode, user, group)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.ensure_subdirs_exist("/w/x", "y/z")')," creates the directories ",Object(r.b)("inlineCode",{parentName:"p"},"/w/x/y"),"\nand ",Object(r.b)("inlineCode",{parentName:"p"},"/w/x/y/z")," in the image, if they do not exist. ",Object(r.b)("inlineCode",{parentName:"p"},"/w/x")," must have already\nbeen created by another image feature. If any dirs to be created already exist\nin the image, their attributes will be checked to ensure they match the\nattributes provided here. If any do not match, the build will fail."),Object(r.b)("p",null,"The arguments ",Object(r.b)("inlineCode",{parentName:"p"},"into_dir")," and ",Object(r.b)("inlineCode",{parentName:"p"},"subdirs_to_create")," are mandatory; ",Object(r.b)("inlineCode",{parentName:"p"},"mode"),",\n",Object(r.b)("inlineCode",{parentName:"p"},"user"),", and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," are optional."),Object(r.b)("p",null,"The argument ",Object(r.b)("inlineCode",{parentName:"p"},"mode")," changes file mode bits of all directories in\n",Object(r.b)("inlineCode",{parentName:"p"},"subdirs_to_create"),". It can be an integer fully specifying the bits or a\nsymbolic string like ",Object(r.b)("inlineCode",{parentName:"p"},"u+rx"),". In the latter case, the changes are applied on\ntop of mode 0."),Object(r.b)("p",null,"The arguments ",Object(r.b)("inlineCode",{parentName:"p"},"user")," and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," change file owner and group of all\ndirectories in ",Object(r.b)("inlineCode",{parentName:"p"},"subdirs_to_create"),". ",Object(r.b)("inlineCode",{parentName:"p"},"user")," and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," can be integers or\nsymbolic strings. In the latter case, the passwd/group database from the host\n(not from the image) is used."),Object(r.b)("h2",{id:"install"},Object(r.b)("inlineCode",{parentName:"h2"},"install")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"install(source, dest, mode, user, group)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.install("//path/fs:data", "dir/bar")')," installs file or directory\n",Object(r.b)("inlineCode",{parentName:"p"},"data")," to ",Object(r.b)("inlineCode",{parentName:"p"},"dir/bar")," in the image. ",Object(r.b)("inlineCode",{parentName:"p"},"dir/bar")," must not exist, otherwise\nthe operation fails."),Object(r.b)("p",null,"The arguments ",Object(r.b)("inlineCode",{parentName:"p"},"source")," and ",Object(r.b)("inlineCode",{parentName:"p"},"dest")," are mandatory; ",Object(r.b)("inlineCode",{parentName:"p"},"mode"),", ",Object(r.b)("inlineCode",{parentName:"p"},"user"),", and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," are\noptional."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"source")," is either a regular file or a directory. If it is a directory, it must\ncontain only regular files and directories (recursively)."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"mode")," can be used only if ",Object(r.b)("inlineCode",{parentName:"p"},"source")," is a regular file."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"If set, it changes file mode bits of ",Object(r.b)("inlineCode",{parentName:"li"},"dest")," (after installation of ",Object(r.b)("inlineCode",{parentName:"li"},"source"),"\nto ",Object(r.b)("inlineCode",{parentName:"li"},"dest"),"). ",Object(r.b)("inlineCode",{parentName:"li"},"mode")," can be an integer fully specifying the bits or a symbolic\nstring like ",Object(r.b)("inlineCode",{parentName:"li"},"u+rx"),". In the latter case, the changes are applied on top of\nmode 0."),Object(r.b)("li",{parentName:"ul"},"If not set, the mode of ",Object(r.b)("inlineCode",{parentName:"li"},"source")," is ignored, and instead the mode of ",Object(r.b)("inlineCode",{parentName:"li"},"dest"),"\n(and all files and directories inside the ",Object(r.b)("inlineCode",{parentName:"li"},"dest"),' if it is a directory) is set\naccording to the following rule: "u+rwx,og+rx" for directories, "a+rx" for files\nexecutable by the Buck repo user, "a+r" for other files.')),Object(r.b)("p",null,"The arguments ",Object(r.b)("inlineCode",{parentName:"p"},"user")," and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," change file owner and group of all\ndirectories in ",Object(r.b)("inlineCode",{parentName:"p"},"dest"),". ",Object(r.b)("inlineCode",{parentName:"p"},"user")," and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," can be integers or symbolic strings.\nIn the latter case, the passwd/group database from the host (not from the\nimage) is used. The default for ",Object(r.b)("inlineCode",{parentName:"p"},"user")," and ",Object(r.b)("inlineCode",{parentName:"p"},"group")," is ",Object(r.b)("inlineCode",{parentName:"p"},"root"),"."),Object(r.b)("h2",{id:"install_buck_runnable"},Object(r.b)("inlineCode",{parentName:"h2"},"install_buck_runnable")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"install_buck_runnable(source, dest, mode, user, group)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.install_buck_runnable("//path/fs:exe", "dir/foo")')," copies\nbuck-runnable artifact ",Object(r.b)("inlineCode",{parentName:"p"},"exe")," to ",Object(r.b)("inlineCode",{parentName:"p"},"dir/foo")," in the image. Unlike ",Object(r.b)("inlineCode",{parentName:"p"},"install"),",\nthis supports only single files -- though you can extract a file from a\nbuck-runnable directory via ",Object(r.b)("inlineCode",{parentName:"p"},"image.source"),", see below."),Object(r.b)("p",null,"See ",Object(r.b)("strong",{parentName:"p"},Object(r.b)("inlineCode",{parentName:"strong"},"install"))," for documentation on arguments ",Object(r.b)("inlineCode",{parentName:"p"},"mode"),", ",Object(r.b)("inlineCode",{parentName:"p"},"user"),", and ",Object(r.b)("inlineCode",{parentName:"p"},"group"),"."),Object(r.b)("h3",{id:"when-to-use-install_buck_runnable-vs-install"},"When to use ",Object(r.b)("inlineCode",{parentName:"h3"},"install_buck_runnable")," vs ",Object(r.b)("inlineCode",{parentName:"h3"},"install"),"?"),Object(r.b)("p",null,"If the file being copied is a buck-runnable (e.g. ",Object(r.b)("inlineCode",{parentName:"p"},"cpp_binary"),",\n",Object(r.b)("inlineCode",{parentName:"p"},"python_binary"),"), use ",Object(r.b)("inlineCode",{parentName:"p"},"install_buck_runnable"),". Ditto for copying executable\nfiles from inside directories output by buck-runnable rules. For everything\nelse, use ",Object(r.b)("inlineCode",{parentName:"p"},"install")," ","[1]","."),Object(r.b)("p",null,"Important: failing to use ",Object(r.b)("inlineCode",{parentName:"p"},"install_buck_runnable")," will cause the installed\nbinary to be unusable in image tests in @mode/dev."),Object(r.b)("h2",{id:"tarball"},Object(r.b)("inlineCode",{parentName:"h2"},"tarball")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"tarball(source, dest, force_root_ownership)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.tarball("files/xyz.tar", "/a/b")')," extracts tarball located at ",Object(r.b)("inlineCode",{parentName:"p"},"files/xyz.tar")," to ",Object(r.b)("inlineCode",{parentName:"p"},"/a/b")," in the image --"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"source")," is one of:",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"an ",Object(r.b)("inlineCode",{parentName:"li"},"image.source")," (docs in ",Object(r.b)("inlineCode",{parentName:"li"},"image_source.bzl"),"), or"),Object(r.b)("li",{parentName:"ul"},"the path of a target outputting a tarball target path,\ne.g. an ",Object(r.b)("inlineCode",{parentName:"li"},"export_file")," or a ",Object(r.b)("inlineCode",{parentName:"li"},"genrule")))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"dest")," is the destination of the unpacked tarball in the image.\nThis is an image-absolute path to a directory that must be created\nby another ",Object(r.b)("inlineCode",{parentName:"li"},"image_feature")," item.\n")),Object(r.b)("h2",{id:"remove"},Object(r.b)("inlineCode",{parentName:"h2"},"remove")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"remove(dest, must_exist)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.remove("/a/b")')," recursively removes the file or directory ",Object(r.b)("inlineCode",{parentName:"p"},"/a/b")," --"),Object(r.b)("p",null,"These are allowed to remove paths inherited from the parent layer, or those\ninstalled by RPMs even in this layer. However, removing other items\nexplicitly added by the current layer is not allowed since that seems like a\ndesign smell -- you should probably refactor the constituent image features\nnot to conflict with each other."),Object(r.b)("p",null,"By default, it is an error if the specified path is missing from the image,\nthough this can be avoided by setting ",Object(r.b)("inlineCode",{parentName:"p"},"must_exist")," to ",Object(r.b)("inlineCode",{parentName:"p"},"False"),"."),Object(r.b)("h2",{id:"rpms_install"},Object(r.b)("inlineCode",{parentName:"h2"},"rpms_install")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"rpms_install(rpmlist)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.rpms_install(["foo"])')," installs ",Object(r.b)("inlineCode",{parentName:"p"},"foo.rpm"),",\n",Object(r.b)("inlineCode",{parentName:"p"},'image.rpms_install(["//target:bar"])')," builds ",Object(r.b)("inlineCode",{parentName:"p"},"bar")," target and installs\nresulting RPM."),Object(r.b)("p",null,"The argument to both functions is a list of RPM package names to install,\nwithout version or release numbers. Dependencies are installed as needed.\nOrder is not significant."),Object(r.b)("p",null,"As shown in the above example, RPMs may also be installed that are the\noutputs of another buck rule by providing a target path or an ",Object(r.b)("inlineCode",{parentName:"p"},"image.source"),"\n(docs in",Object(r.b)("inlineCode",{parentName:"p"},"image_source.bzl"),"), or by directly providing a target path."),Object(r.b)("p",null,"If RPMs are specified by name, as in the first example above, the default\nbehavior is to install the latest available version of the RPMs. Particular\nversions of RPMs can be pinned by specifying ",Object(r.b)("inlineCode",{parentName:"p"},"image.opts")," with\n",Object(r.b)("inlineCode",{parentName:"p"},"rpm_version_set_overrides")," argument. This argument must be the list of\nstructures defined by ",Object(r.b)("inlineCode",{parentName:"p"},"image.rpm.nevra()"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'image.layer(\n    name = "my_layer",\n    features = [\n        image.rpms_install([\n            "foo",\n        ]),\n    ],\n    build_opts = image.opts(\n        rpm_version_set_overrides = [\n            image.rpm.nevra(\n                name = "foo",\n                epoch = "0",\n                version = "1",\n                release = "el7",\n                arch = "x86_64"\n            ),\n        ],\n    ),\n)\n')),Object(r.b)("p",null,"In this example ",Object(r.b)("inlineCode",{parentName:"p"},"foo-1-el7.x86_64")," will be installed into the layer ",Object(r.b)("inlineCode",{parentName:"p"},"my_layer"),"\neven if a newer version is available."),Object(r.b)("p",null,"If the argument ",Object(r.b)("inlineCode",{parentName:"p"},"rpmlist")," lists both RPM name and buck rule targets, RPMs\nspecified by buck rule targets are installed before RPMs specified by names.\nHence, if an RPM defined by name requires a newer version of an RPM defined by\nbuck rule target, the RPM will be upgraded and the whole operation may succeed.\nThus, the explicit specification of RPM version by buck rule does not guarantee\nthat this particular version is present in resulting image."),Object(r.b)("p",null,"Another important caveat about RPMs specified by buck rule targets is that\ndowngrade is allowable: if the parent layer has RPM ",Object(r.b)("inlineCode",{parentName:"p"},"foobar-v2")," installed, and\nthen ",Object(r.b)("inlineCode",{parentName:"p"},"foobar-v1")," is specified by a buck rule, the result of RPM installation\nwill be ",Object(r.b)("inlineCode",{parentName:"p"},"foobar-v2")," downgraded to ",Object(r.b)("inlineCode",{parentName:"p"},"foobar-v1"),"."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"image.rpms_install()")," provides only limited support for RPM post-install\nscripts. Those scripts are executed in a virtual environment without runtime\nmounts like ",Object(r.b)("inlineCode",{parentName:"p"},"/proc"),". As an example, the script may invoke a binary requiring\n",Object(r.b)("inlineCode",{parentName:"p"},"/proc/self/exe")," or a shared library from a directory not available in the\nimage. Then the binary fails, and the final result of the operation would differ\nfrom the RPM installation on the host where the binary succeeds. The issue may\nbe aggravated by the lack of error handling in the script making the RPM install\noperation successful even if the binary fails."),Object(r.b)("h2",{id:"rpms_remove_if_exists"},Object(r.b)("inlineCode",{parentName:"h2"},"rpms_remove_if_exists")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"rpms_remove_if_exists(rpmlist)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.rpms_remove_if_exists(["baz"])')," removes ",Object(r.b)("inlineCode",{parentName:"p"},"baz.rpm")," if exists."),Object(r.b)("p",null,"Note that removals may only be applied against the parent layer -- if your\ncurrent layer includes features both removing and installing the same\npackage, this will cause a build failure."),Object(r.b)("h2",{id:"symlink_dir"},Object(r.b)("inlineCode",{parentName:"h2"},"symlink_dir")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"symlink_dir(link_target, link_name)")),Object(r.b)("p",null,"The operation follows rsync convention for a destination (",Object(r.b)("inlineCode",{parentName:"p"},"link_name"),"):\n",Object(r.b)("inlineCode",{parentName:"p"},"ends/in/slash/"),' means "write into this directory", ',Object(r.b)("inlineCode",{parentName:"p"},"does/not/end/with/slash"),'\nmeans "write with the specified filename":'),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},'image.symlink_dir("/d", "/e/")')," symlinks directory ",Object(r.b)("inlineCode",{parentName:"li"},"/d")," to ",Object(r.b)("inlineCode",{parentName:"li"},"/e/d")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},'image.symlink_dir("/a", "/b/c")')," symlinks directory ",Object(r.b)("inlineCode",{parentName:"li"},"/a")," to ",Object(r.b)("inlineCode",{parentName:"li"},"/b/c"))),Object(r.b)("p",null,"Both arguments are mandatory:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"link_target")," is the image-absolute source file/dir of the symlink.\nThis file must exist as we do not support dangling symlinks."),Object(r.b)("p",{parentName:"li"},"  IMPORTANT: The emitted symlink will be ",Object(r.b)("strong",{parentName:"p"},"relative")," by default, enabling\neasier inspection if images via ",Object(r.b)("inlineCode",{parentName:"p"},"buck-image-out"),". If this is a problem\nfor you, we can add an ",Object(r.b)("inlineCode",{parentName:"p"},"absolute")," boolean kwarg.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"link_name")," is an image-absolute path. A trailing / is significant."),Object(r.b)("p",{parentName:"li"},"  A ",Object(r.b)("inlineCode",{parentName:"p"},"link_name")," that does NOT end in / is a full path in the new image,\nending with a filename for the new symlink."),Object(r.b)("p",{parentName:"li"},"  As with ",Object(r.b)("inlineCode",{parentName:"p"},"image.clone"),", a traling / means that ",Object(r.b)("inlineCode",{parentName:"p"},"link_name")," must be a\npre-existing directory in the image (e.g. created via ",Object(r.b)("inlineCode",{parentName:"p"},"image.mkdir"),"), and\nthe actual link will be placed at ",Object(r.b)("inlineCode",{parentName:"p"},"link_name/(basename of link_target)"),".\n"))),Object(r.b)("h2",{id:"symlink_file"},Object(r.b)("inlineCode",{parentName:"h2"},"symlink_file")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"symlink_file(link_target, link_name)")),Object(r.b)("p",null,"The operation follows rsync convention for a destination (",Object(r.b)("inlineCode",{parentName:"p"},"link_name"),"):\n",Object(r.b)("inlineCode",{parentName:"p"},"ends/in/slash/"),' means "write into this directory", ',Object(r.b)("inlineCode",{parentName:"p"},"does/not/end/with/slash"),'\nmeans "write with the specified filename":'),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},'image.symlink_file("/d", "/e/")')," symlinks file ",Object(r.b)("inlineCode",{parentName:"li"},"/d")," to ",Object(r.b)("inlineCode",{parentName:"li"},"/e/d")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},'image.symlink_file("/a", "/b/c")')," symlinks file ",Object(r.b)("inlineCode",{parentName:"li"},"/a")," to ",Object(r.b)("inlineCode",{parentName:"li"},"/b/c"))),Object(r.b)("p",null,"Both arguments are mandatory:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"link_target")," is the image-absolute source file/dir of the symlink.\nThis file must exist as we do not support dangling symlinks."),Object(r.b)("p",{parentName:"li"},"  IMPORTANT: The emitted symlink will be ",Object(r.b)("strong",{parentName:"p"},"relative")," by default, enabling\neasier inspection if images via ",Object(r.b)("inlineCode",{parentName:"p"},"buck-image-out"),". If this is a problem\nfor you, we can add an ",Object(r.b)("inlineCode",{parentName:"p"},"absolute")," boolean kwarg.")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},Object(r.b)("inlineCode",{parentName:"p"},"link_name")," is an image-absolute path. A trailing / is significant."),Object(r.b)("p",{parentName:"li"},"  A ",Object(r.b)("inlineCode",{parentName:"p"},"link_name")," that does NOT end in / is a full path in the new image,\nending with a filename for the new symlink."),Object(r.b)("p",{parentName:"li"},"  As with ",Object(r.b)("inlineCode",{parentName:"p"},"image.clone"),", a traling / means that ",Object(r.b)("inlineCode",{parentName:"p"},"link_name")," must be a\npre-existing directory in the image (e.g. created via ",Object(r.b)("inlineCode",{parentName:"p"},"image.mkdir"),"), and\nthe actual link will be placed at ",Object(r.b)("inlineCode",{parentName:"p"},"link_name/(basename of link_target)"),".\n"))),Object(r.b)("h2",{id:"host_dir_mount"},Object(r.b)("inlineCode",{parentName:"h2"},"host_dir_mount")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"host_dir_mount(source, mountpoint)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.host_dir_mount("/path/foo")')," bind-mounts the host directory\n",Object(r.b)("inlineCode",{parentName:"p"},"/path/foo")," into the container at ",Object(r.b)("inlineCode",{parentName:"p"},"/path/foo"),". Another image item must\nprovide the parent ",Object(r.b)("inlineCode",{parentName:"p"},"/path"),", but this item will create the mount-point."),Object(r.b)("h2",{id:"host_file_mount"},Object(r.b)("inlineCode",{parentName:"h2"},"host_file_mount")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"host_file_mount(source, mountpoint)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.host_file_mount("/path/bar", "/baz")')," bind-mounts the file ",Object(r.b)("inlineCode",{parentName:"p"},"/path/bar"),"\ninto the container at ",Object(r.b)("inlineCode",{parentName:"p"},"/baz"),"."),Object(r.b)("h2",{id:"layer_mount"},Object(r.b)("inlineCode",{parentName:"h2"},"layer_mount")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"layer_mount(source, mountpoint)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},'image.layer_mount(":other-image-layer")'),' makes the specified layer available\ninside the container available at the "default_mountpoint" provided by the\nlayer in its config. That fails if the layer lacks a default mountpoint, but\nthen you can pass an explicit ',Object(r.b)("inlineCode",{parentName:"p"},"mountpoint")," argument."),Object(r.b)("h2",{id:"layer"},Object(r.b)("inlineCode",{parentName:"h2"},"layer")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"layer(name, parent_layer, features, build_opts, antlir_rule, **image_layer_kwargs)")),Object(r.b)("p",null,"No docstring available."),Object(r.b)("h2",{id:"layer_alias"},Object(r.b)("inlineCode",{parentName:"h2"},"layer_alias")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"layer_alias(name, layer, visibility)")),Object(r.b)("p",null,"No docstring available."),Object(r.b)("h2",{id:"package"},Object(r.b)("inlineCode",{parentName:"h2"},"package")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"package(name, layer, visibility, writable_subvolume, seed_device, antlir_rule, build_appliance, format)")),Object(r.b)("p",null,"No docstring available."),Object(r.b)("h2",{id:"packaged_layer"},Object(r.b)("inlineCode",{parentName:"h2"},"packaged_layer")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"packaged_layer(layer_name, publisher_name)")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"image.packaged_layer")," is a small wrapper around ",Object(r.b)("inlineCode",{parentName:"p"},"image.layer")," to support both\ncreating a layer and including a reference to a corresponding 'publisher' target\nwithin that layer, which is then responsible for publishing that layer as a\nsquashfs package to an external artifact store."),Object(r.b)("p",null,"Args:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),"layer_name: Target name that will be given to `partial_layer`.\n\npublisher_name: Target name that will be given to `partial_publisher`.\n\npartial_layer: A partial `image.layer` object that will be supplied with a\n    custom `mount_config` and located under `name`.\n\npartial_publisher: A partial target supporting a `path_actions` argument,\n    which will be provided by the implementation. When run, this target\n    should publish the targets in `path_actions` to an artifact store.\n")),Object(r.b)("h2",{id:"python_unittest"},Object(r.b)("inlineCode",{parentName:"h2"},"python_unittest")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"python_unittest(name, layer, boot, run_as_user, visibility, par_style, hostname, container_opts, **python_unittest_kwargs)")),Object(r.b)("p",null,"No docstring available."),Object(r.b)("h2",{id:"sendstream_layer"},Object(r.b)("inlineCode",{parentName:"h2"},"sendstream_layer")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"sendstream_layer(name, source, build_opts, antlir_rule, **image_layer_kwargs)")),Object(r.b)("p",null,"No docstring available."),Object(r.b)("h2",{id:"source"},Object(r.b)("inlineCode",{parentName:"h2"},"source")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"source(source, **kwargs)")),Object(r.b)("p",null,"No docstring available."),Object(r.b)("h2",{id:"test_rpm_names"},Object(r.b)("inlineCode",{parentName:"h2"},"test_rpm_names")),Object(r.b)("p",null,"Prototype: ",Object(r.b)("inlineCode",{parentName:"p"},"test_rpm_names(name, layer, rpm_list)")),Object(r.b)("p",null,"No docstring available."))}p.isMDXComponent=!0},182:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));var i=n(0),a=n.n(i);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createContext({}),p=function(e){var t=a.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=p(e.components);return a.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),s=p(n),m=i,u=s["".concat(l,".").concat(m)]||s[m]||d[m]||r;return n?a.a.createElement(u,o(o({ref:t},c),{},{components:n})):a.a.createElement(u,o({ref:t},c))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var o={};for(var b in t)hasOwnProperty.call(t,b)&&(o[b]=t[b]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var c=2;c<r;c++)l[c]=n[c];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);