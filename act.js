/**
 * -----------------------------------------------------------------------------
 * ACT
 * -----------------------------------------------------------------------------
 * @version 0.0.1
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [are]{@link https://github.com/imaginate/are}
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3]{@link http://usejsdoc.org/}
 * @see [Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 */

'use strict';

// save reference to the base path
var BASE_DIR = process.cwd();

var help = require('./src/helpers');
var cut   = help.cut;
var has   = help.has;
var is    = help.is;
var log   = help.log;
var slice = help.slice;

/**
 * @typedef {!Array<string>} Args
 */

/** @type {!RegExp} */
var TRIM_START = /^ *(?:act +)?/;
/** @type {!RegExp} */
var TRIM_END = / +$/;
/** @type {!RegExp} */
var NODE = /^["']?(?:.+\/)?node(?:.js)?["']?$/;
/** @type {!RegExp} */
var ACT = /^["']?(?:.+\/)?act(?:.js)?["']?$/;

var findTaskDir  = require('./src/find-task-dir');
var showHelp     = require('./src/show-help');
var showVersion  = require('./src/show-version');
var addShortcuts = require('./src/insert-shortcuts');
var getTaskArgs  = require('./src/get-task-args');
var runTasks     = require('./src/run-tasks');

/**
 * @public
 * @param {(string|!Array<string>)} cmd
 */
module.exports = function initAct(cmd) {

  /** @type {string} */
  var taskDir;
  /** @type {TaskArgs} */
  var tasks;
  /** @type {!TypeError} */
  var error;
  /** @type {Args} */
  var args;

  if ( is.str(cmd) ) {
    cmd = cut(cmd, TRIM_START);
    cmd = cut(cmd, TRIM_END);
    args = cmd.split(' ');
  }
  else if ( is('strings', cmd) ) {
    args = has(cmd[0], NODE) && has(cmd[1], ACT)
      ? slice(cmd, 2)
      : has(cmd[0], ACT)
        ? slice(cmd, 1)
        : cmd;
  }
  else {
    error = new TypeError('invalid cmd param (must be a string or an array of strings) for act init');
    log.error('Failed act command', error, { cmd: cmd });
  }

  taskDir = findTaskDir(BASE_DIR);

  if ( showHelp(taskDir, args) || showVersion(args) ) return;

  args = addShortcuts(taskDir, args);
  tasks = getTaskArgs(taskDir, args);
  runTasks(tasks);
};
