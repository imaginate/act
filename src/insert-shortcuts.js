/**
 * -----------------------------------------------------------------------------
 * ACT: INSERT-SHORTCUTS
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

var help = require('./helpers');
var each  = help.each;
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
var is    = help.is;
var log   = help.log;
var until = help.until;

/**
 * @typedef {Object<string, string>} Shortcuts
 */

/** @type {!RegExp} */
var SHORTCUTS = /^_?shortcuts?(?:.json)?$/;
/** @type {!RegExp} */
var CONFIG = /^_?config(?:.json)?$/;
/** @type {!RegExp} */
var METHOD = /^-/;
/** @type {!RegExp} */
var VALUE = /=$/;

/**
 * @param {string} taskDir
 * @param {Args} args
 * @return {Args}
 */
module.exports = function insertShortcuts(taskDir, args) {

  /** @type {?Shortcuts} */
  var shortcuts;
  /** @type {Args} */
  var newArgs;
  /** @type {!TypeError} */
  var error;

  shortcuts = getShortcuts(taskDir);

  if (!shortcuts) return args;

  if ( !is('stringMap', shortcuts) ) {
    error = new TypeError('invalid act shortcuts (must be an object with string values)');
    log.error('Failed act command', error, { shortcuts: shortcuts });
  }

  newArgs = [];
  each(args, function(arg, i, args) {

    if (i) {
      // if arg is a method or value push it and end
      if ( has(arg, METHOD) || has(args[i - 1], VALUE) ) {
        newArgs = fuse.val(newArgs, arg);
        return;
      }
    }

    if ( has(shortcuts, arg) ) {
      args = shortcuts[arg].split(' ');
      newArgs = fuse(newArgs, args);
    }
    else newArgs = fuse.val(newArgs, arg);
  });

  return newArgs;
};

/**
 * @private
 * @param {string} taskDir
 * @return {?Shortcuts}
 */
function getShortcuts(taskDir) {

  /** @type {!TypeError} */
  var error;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;

  files = get.filepaths(taskDir, { validExts: 'json' });

  if (!files.length) return null;

  // check for shortcuts.json
  until(true, files, function(filename) {
    if ( !has(filename, SHORTCUTS) ) return false;
    file = filename;
    return true;
  });

  // handle for shortcuts.json
  if (file) {
    file = fuse(taskDir, file);
    return require(file);
  }

  // check for config.json
  until(true, files, function(filename) {
    if ( !has(filename, CONFIG) ) return false;
    file = filename;
    return true;
  });

  // handle for config.json
  file = fuse(taskDir, file);
  config = require(file);

  if (!config) return null;

  if ( !is.obj(config) ) {
    error = new TypeError('invalid act config.json (must be an object)');
    log.error('Failed act command', error, { file: file, config: config });
  }

  // if config has a shortcuts property return its value
  return get(config, SHORTCUTS)[0] || null;
}
