# act [![npm version](https://badge.fury.io/js/node-act.svg)](https://badge.fury.io/js/node-act)
### Simple Task Management
Quickly write, organize, and run [node.js](https://nodejs.org) build scripts/tasks with [_act_](https://github.com/imaginate/act).

## Install
```bash
$ npm install -g node-act
```

## Setup
1. Add a directory named **_act-tasks_** to the root of your project.
2. For each task add a new script, ``` task-name.js ```, to the **_act-tasks_** directory. The name of the file is the name of the task. The name must start with a lower-case letter, and the file should export a [Task](#tasks).

## Use
```bash
$ cd <your-project-root>

# BASIC USE
$ act <task> [...-method]

# PASS VALUES
$ act <task=> <value>
$ act <task> <-method=> <value>
$ act <task=> <defaultMethodsValue> <-method=> <methodValue> <-method>

# RUN MULTIPLE TASKS
$ act <task> <task> <task>
$ act <task> <-method> <task> <task=> <value>

# SHOW HELP INFO
$ act
$ act ?
$ act -h
$ act --help

# SHOW VERSION
$ act -v
$ act --version
```

## Tasks
All task scripts must export an object or function with the below properties.

#### Task with NO Methods
| Property               | Type     | Alias        | Details                                                                                |
| :--------------------- | :------- | :----------- | :------------------------------------------------------------------------------------- |
| description (optional) | string   | desc,descrip | The description for the task.                                                          |
| value (optional)       | string   | val          | If the task accepts a value this string should be a one-word description for it.       |
| method                 | function |              | The action for the task. If the task exports a function this property is not required. |

#### Task with Methods
| Property               | Type                               | Alias        | Details                                                                                                   |
| :--------------------- | :--------------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------- |
| description (optional) | string                             | desc,descrip | The description for the task.                                                                             |
| value (optional)       | string                             | val          | If the task accepts a default value this string should be a one-word description for the value.           |
| default                | string                             |              | The methods executed if the task is called without any arguments (e.g. ``` "-method= value -method" ```). |
| methods                | object\<string, [Method](#method)> |              | The methods for the task.                                                                                 |

#### Method
| Property               | Type     | Alias        | Details                                                                                                                 |
| :--------------------- | :------- | :----------- | :---------------------------------------------------------------------------------------------------------------------- |
| description (optional) | string   | desc,descrip | The description for the method.                                                                                         |
| value (optional)       | string   | val          | If the method accepts a value this string should be a one-word description for it.                                      |
| method                 | function |              | The action for the method. If the [Method](#method) is a function (instead of an object) this property is not required. |

## Shortcuts
You may create task shortcuts by adding ``` shortcuts.json ``` to the **_act-tasks_** directory. It should consist of an object with ``` shortcut-name => shortcut-command ``` pairs.
```json
{
  "name": "task -method task= value -method"
}
```

## Other Details
**contributing:** [see contributing guideline](https://github.com/imaginate/act/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/act/issues)<br>
**questions:** learn@algorithmiv.com


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/act"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
