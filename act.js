/**
 * -----------------------------------------------------------------------------
 * ACT
 * -----------------------------------------------------------------------------
 * @version 1.2.0
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
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
var NODE = /^["']?(?:.+[\/\\])?node(?:.[a-z]+)?["']?$/;
/** @type {!RegExp} */
var ACT = /^["']?(?:.+[\/\\])?act(?:.js)?["']?$/;

var findTaskDir  = require('./src/tasks/find-dir');
var loadConfig   = require('./src/config/load');
var showHelp     = require('./src/show/help');
var showVersion  = require('./src/show/version');
var runTasks     = require('./src/tasks/run');

/**
 * @public
 * @param {(string|!Array<string>)} cmd
 * @return {boolean}
 */
module.exports = function initAct(cmd) {

  /** @type {(?Config|boolean)} */
  var config;
  /** @type {!TypeError} */
  var error;
  /** @type {Args} */
  var args;
  /** @type {string} */
  var dir;

  if ( is.str(cmd) ) {
    cmd = cut(cmd, TRIM_START);
    cmd = cut(cmd, TRIM_END);
    args = cmd.split(' ');
  }
  else if ( is('!strings', cmd) ) {
    args = has(cmd[0], NODE) && has(cmd[1], ACT)
      ? slice(cmd, 2)
      : has(cmd[0], ACT)
        ? slice(cmd, 1)
        : cmd;
  }
  else {
    error = 'invalid `cmd` param (must be a string or an array of strings)';
    error = new TypeError(error);
    log.error('Failed `act` command', error, { cmd: cmd });
    return false;
  }

  dir = findTaskDir(BASE_DIR);
  config = loadConfig(dir);
  return config
    ? is.help(args)
      ? showHelp(dir, config)
      : is.version(args)
        ? showVersion(args)
        : runTasks(dir, config, args)
    : false;
};
