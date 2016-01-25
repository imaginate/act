/**
 * -----------------------------------------------------------------------------
 * ACT: FIND-ALIAS
 * -----------------------------------------------------------------------------
 * @version 1.1.0
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

var help = require('../helpers');
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
var is    = help.is;
var log   = help.log;
var until = help.until;

/**
 * @typedef {Object<string, string>} Alias
 */

/** @type {!RegExp} */
var ALIAS = /^_?(?:shortcuts?|alias).json$/;

/**
 * @param {string} taskDir
 * @return {(?Alias|boolean)}
 */
module.exports = function findAlias(taskDir) {

  /** @type {?Alias} */
  var alias;
  /** @type {!TypeError} */
  var error;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;

  files = get.filepaths(taskDir, { validExts: 'json' });

  if (!files.length) return null;

  // check for alias.json
  until(true, files, function(filename) {
    if ( !has(filename, ALIAS) ) return false;
    file = filename;
    return true;
  });

  if (!file) return null;

  file = fuse(taskDir, file);
  try {
    alias = require(file);
  }
  catch (error) {
    log.error('Failed `act` command', error, { file: file });
    return false;
  }

  if ( !is('stringMap', alias) ) {
    error = 'invalid `alias.json` (must be an object with string values)';
    error = new TypeError(error);
    log.error('Failed `act` command', error, { alias: alias });
    return false;
  }

  return alias;
};
