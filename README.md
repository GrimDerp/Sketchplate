# Sketchplate
##pre-project tooling for getting started quick

Sketchplate is a system for quickly generating projects with the collections of libraries and processes that you use frequently. It provides tools to maintain various templates, retrieve and update your favorite libraries, quickly copy your template into a specified folder and launch it in your favorite editor. It is published on [NPM](http://npmjs.org) for [Node.js](http://nodejs.org). Sketchplate currently supports OSX. Support for Linux and Windows is in future plans.

There are currently 3 main components to sketchplate:

1.	[Templates](#template) - create and manage your own templates
1.	[Fetching](#fetch) - manage and automate retrieval of external resources
1.	[Hooks](#hooks) - express execution of common tasks after project creation

##Installation
	$ npm install -g sketchplate

##Creating your first new project
	$ sketchplate new ./my-sketchplate-project

##CLI Interface

	  Usage: sketchplate <command> [options]

Options:

		-h, --help     output usage information
		-V, --version  output the version number

Commands:

-	[new](#new) [options] <location> - create a new project at \<location\> with hooks for [options]
-	[template](#template) [options] [command] - perform commands on your sketchplate templates
-	[fetch](#fetch) [options] [names…] - perform resource fetches on your projects and templates
-	[hooks](#hooks) [options] [location] - perform any of the hooks on existing projects
-	[config](#config) [options] [command] - edit your sketchplate configuration


##new
Specify the location for the new project and any combinations of [hooks](#hooks) to perform upon completion.
*In this example the user has their editor set up as Sublime Text 2, the current default editor*

  **Usage:** sketchplate new [options] <location>

  Options:

    -h, --help                 output usage information
    -b, --browse               Open project in file browser
    -e, --editor               Launch project in editor orion
    -g, --git-init [remote]    Initialize a git repository with template committed, optionally provide a remote URL
    -n, --npm-install          Run npm install
    -s, --server [port]        Start a static file server with connect on [port]
    -v, --verbose              Display details including server log
    -f, --fetch                Update all fetched assets before creating project
    -t, --template [template]  Create with [template] template


##template

  **Usage:** sketchplate template [options] [command]

  Commands:

    new [options] [name]
    create a new template

    edit [options] [name]
    edit an existing template

    fetch [options] [names…]
    fetch resources for a template

    list
    list all of the installed templates

    install <package> [folder]
    install a new template

    remove <name>
    remove an existing template

    set <name>
    set the default template, currently `node-server`

  Options:

    -h, --help  output usage information    

###template install
The `sketchplate template` commands help you manage your collection of templates; its 'install` sub-command allows you to install
any repository or zip archive as a new template, below are several ways to make a template from [html5-boilerplate](http://github.com/h5bp/html5-boilerplate): 

    # fetch by github <user>/<repo>:
    sketchplate template install h5bp/html5-boilerplate

    # use a specific tag:
    sketchplate template install h5bp/html5-boilerplate#v4.2.0

    # use a url to a git repository:
    sketchplate template install https://github.com/h5bp/html5-boilerplate.git

    # use a zip archive, any provide what to name the folder (otherwise this would be named _v4.2.0_):
    sketchplate template install https://github.com/h5bp/html5-boilerplate/archive/v4.2.0.zip html5-boilerplate

##fetch

	Usage: sketchplate fetch <command> [names…]

There is a global `fetch.json` which you can use to add urls to resources you wish to keep track of and add to any project. The retrieval and updating of those resources is automated and **doesn't use any package manager** _([Volo](http://github.com/jrburke/volojs), [Bower](http://github.com/twitter/bower))_.
Use in an existing project with: `sketchplate fetch add [id1] [id2]` or `-i` for interactive mode. To assist in maintaining the dependencies of your templates, a [template.json](http://github.com/hapticdata/Sketchplate/tree/master/defaults/templates/amd-sketch/template.json) is used. The `sketchplate template fetch` command is used to update your templates resources.

  **Usage:** sketchplate fetch [options] [command]

  Commands:

    add [options]
    add fetched resources to your project

  Options:

    -h, --help  output usage information
    -e, --edit  Edit fetch.json in your editor


To use, you simply describe where it is, and where you want its contents to go.
_currently supports **file**, **zip**, **clone**:_

####Download a file, copy it to the target:

	{
		"file": "https://raw.github.com/caolan/async/master/lib/async.js",
		"target": "js/vendor/async.js"
	}

####_git clone_ a repository and copy its `src/dat` folder into `js/vendor/dat`:

	{
		"clone": "https://code.google.com/p/dat-gui/",
		"target": {
			"src/dat": "js/vendor/dat"
		}
	}

#####_git clone_ a repository, checkout a `tag` and copy its entire contents:

    {
        "clone": "https://github.com/hapticdata/toxiclibsjs.git",
        "tag": "v0.2.0",
        "target": {
            "lib/toxi": "js/vendor/toxi-v0.2.0"
    }

#####_git clone_ a repository, checkout a `branch` and copy its targets:

    {
        "clone": "https://github.com/hapticdata/toxiclibsjs.git",
        "branch": "feature-color",
        "target": {
            "lib/toxi": "js/vendor/toxi"
        }
    }

####Download a zip, extract it, copy its targets:

	{
		"zip": "https://github.com/twitter/bootstrap/zipball/master",
		"target": {
			"js/": "js/vendor/bootstrap",
			"less/": "less/vendor/bootstap"
		}
	}

##Hooks
Once a new project has been created there are several things you may want to do immediately or any future time you are working with that project, I call these Hooks. Each of these are available as options on `sketchplate new [options] <location>` 
or can be used relative to your current directory with `sketchplate hooks [options]`

**Usage:** sketchplate hooks [options]

    Options:

    -h, --help                 output usage information
    -b, --browse               Open project in file browser
    -e, --editor               Launch project in editor "Sublime Text 2 (osx)"
    -g, --git-init             Initialize a git repository
    -n, --npm-install          Run npm install
    -s, --server [port]        Start a static file server with connect on [port]

run any combination of these hooks. These are also available for `sketchplate new` `sketchplate template add` and `sketchplate template edit`.
for use with existing projects with `sketchplate hooks`

For example, This will open `./www` in you configured editor, initialize a git repository, open the folder in Finder and start serving it on port 8080:

	sketchplate hooks ./www -egb -s 8080

##Config

**Usage:** sketchplate config [options] [command]

	Commands:

	editor [options] 
	setup your editor
	
	templates <path>
	change the directory of your templates, currently `../templates`

	Options:

	-h, --help  output usage information
	-e, --edit  Edit the config.json in your editor


###Editors
Set your editor to one of the following with:

	sketchplate config editor

1. $EDITOR
1. atom
1. BBEdit (osx) (select install command-line support on welcome screen)
1. orion _(bundled with sketchplate)_
1. Sublime Text 2 (osx)
1. Sublime Text 3 (osx)
1. Sublime Text - in $PATH (run `subl` process)
1. Textmate (osx) ([install shell support](http://blog.macromates.com/2011/mate-and-rmate/))
1. Vim
1. Vim - in new terminal (osx)
1. WebStorm

**Add many other editors easily.** Say you have [coda-cli](http://justinhileman.info/coda-cli/) (or [Command-Line-Coda](https://github.com/egonSchiele/Command-Line-Coda)) installed and want to use Coda as your editor:

1.	launch your config.json in your editor with `sketchplate config -e`
1.	add `"coda": { "cmd": "coda", "args": ["<%=workspace%>"] }` to the `"editors"`
1.	change `"editor"` to `"coda"`

You can also edit any of the editors to use additional flags. The token `<%= workspace %>` will be replaced with the project path.

Your editors launch configuration has 3 properties:

* `cmd` the command to launch the editor, such as `vim`
* `args` an array of arguments to send the editor
* `cwd` the "current working directory" in which the editor should be launched from

Any of these variables can contain underscore `_.template()` variables, it will be provided an object such as:

```
{
    workspace: location, //the absolute path of the project created
    workspaceDir: dir, //workspace but always a directory, never a file
    sketchplatePath: sketchplatePath, //the location of `sketchplate`
    process: process //process object, env variables in process.env
}
```




## Rules of Sketchplate

1. **New projects, fast.** Creating a new project quickly is more important than filling in details. There should be no questions asked when creating a new project. (_Unless you care to use a hook that involves confirmations_)
1. **Withold opinions.** The root of sketchplate is that you know how you like to work and its likely different than others prescribe. Sketchplate won't tell you how to structure your project or what tools to use and will always emphasize personalization.
1. **Never leave a mark on a project.** Sketchplate will never place any meta or configuration details into a project (i.e. component.json, Gruntfile.js)
1. **All projects are equal.** It doesn't matter if you created your project with sketchplate or not, any project / folder will interface the same with sketchplate.

## Roadmap / Contributions
Contributions are welcome and much-appreciated, here are a list of some of the features anticipated for Sketchplate:

* _User-contributed hooks_. Currently the hooks system is part of the core library. I anticipate that in the future there will be an installed 'hooks' folder next to the 'templates' folder and there can be user-defined hooks available within sketchplate's options.
* _Template-specific hooks_ sitting along side the `template` folder in a template, there will be a `hooks` folder with template-specific hooks to be called everytime a project is generated with that template. These will be specified in a `hooks` property in the template.json

Sketchplate was initiated by [Kyle Phillips](http://haptic-data.com) on April 8th, 2012
