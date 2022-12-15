/**
 * -----------------------------------------------------------------------------
 * ACT: FIND-CONFIG
 * -----------------------------------------------------------------------------
 * @version 1.4.1
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

var help = require('../helpers');
var fuse  = help.fuse;
var get   = help.get;
var has   = help.has;
var is    = help.is;
var log   = help.log;
var until = help.until;

/**
 * @typedef {Object<string, string>} Config
 */

/** @type {!RegExp} */
var CONFIG = /^_?config.json$/;

/**
 * @param {string} taskDir
 * @return {(?Config|boolean)}
 */
module.exports = function findConfig(taskDir) {

  /** @type {?Config} */
  var config;
  /** @type {!TypeError} */
  var error;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;

  files = get.filepaths(taskDir, { validExts: 'json' });

  if (!files.length) return null;

  // check for config.json
  until(true, files, function(filename) {
    if ( !has(filename, CONFIG) ) return false;
    file = filename;
    return true;
  });

  if (!file) return null;

  file = fuse(taskDir, file);
  try {
    config = require(file);
  }
  catch (error) {
    log.error('Failed `act` command', error, { file: file });
    return false;
  }

  if ( !is('obj', config) ) {
    error = new TypeError('invalid `config.json` (must be an object)');
    log.error('Failed `act` command', error, { file: file, config: config });
    return false;
  }

  return config;
};
