/**
 * -----------------------------------------------------------------------------
 * ACT: FIND-CONFIG
 * -----------------------------------------------------------------------------
 * @version 1.5.0
 * @see [Act](https://github.com/imaginate/act)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [Vitals](https://github.com/imaginate/vitals)
 * @see [LogOCD](https://github.com/imaginate/log-ocd)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

const { fuse, get, has, is, log, resolve, until } = require('../helpers');

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

  file = resolve(taskDir, file);
  try {
    config = require(file);
  }
  catch (error) {
    log.error("Failed `act' command.", error, { file: file });
    return false;
  }

  if ( !is('obj', config) ) {
    error = new TypeError('invalid `config.json` (must be an object)');
    log.error('Failed `act` command', error, { file: file, config: config });
    return false;
  }

  return config;
};
