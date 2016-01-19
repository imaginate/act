# act [![npm version](https://badge.fury.io/js/act.svg)](https://badge.fury.io/js/act)
### Simple Task Management
Quickly write, organize, and run [node.js](https://nodejs.org) build scripts with [_act_](https://github.com/imaginate/act).

## Install
```bash
$ npm install -g node-act
```

## Setup
- **Add Task Directory:** Add a directory named _act-tasks_ to your project root.
- **Add A Task:** Add a new JavaScript file to the _act-tasks_ directory. The name of the file is the name of the task. The name must start with a lower-case letter, and the file should export a [Task object](#tasks).

## Use
```bash
$ cd <your-project-root>
```
- **Basic Use**
  ```bash
  $ act <task> [...-method]
  ```
- **Pass Values**
  ```bash
  $ act <task=> <defaultValue>
  $ act <task> <-method=> <methodValue>
  ```
- **Multiple Tasks**
  ```bash
  $ act <task> <task> <task>
  $ act <task> <-method> <task> <task=> <value>
  ```
- **Show Help Menu**
  ```bash
  $ act
  $ act ?
  $ act -h
  $ act --help
  ```
- **Show Version**
  ```bash
  $ act -v
  $ act --version
  ```

## Other Details
**contributing:** [see contributing guideline](https://github.com/imaginate/act/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/act/issues)<br>
**questions:** learn@algorithmiv.com


--
**Happy Developing,**

<a href="http://www.algorithmiv.com/act"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
