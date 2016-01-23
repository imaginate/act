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

/**
 * @param {string} taskDir
 * @return {(?Shortcuts|boolean)}
 */
module.exports = function getShortcuts(taskDir) {

  /** @type {?Shortcuts} */
  var shortcuts;
  /** @type {?Object} */
  var config;
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
    shortcuts = require(file) || null;

    if ( !is('stringMap', shortcuts) ) {
      error = 'invalid `shortcuts.json` (must be an object with string values)';
      error = new TypeError(error);
      log.error('Failed `act` command', error, { shortcuts: shortcuts });
      return false;
    }

    return shortcuts;
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
    error = new TypeError('invalid `config.json` (must be an object)');
    log.error('Failed `act` command', error, { file: file, config: config });
    return false;
  }

  shortcuts = get(config, SHORTCUTS)[0] || null;

  if ( !is('stringMap', shortcuts) ) {
    error = 'invalid `shortcuts` property in `config.json`';
    error = fuse(error, ' (must be an object with string values)');
    error = new TypeError(error);
    log.error('Failed `act` command', error, {
      shortcuts: shortcuts,
      config:    config
    });
    return false;
  }

  return shortcuts;
};
