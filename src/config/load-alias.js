/**
 * -----------------------------------------------------------------------------
 * ACT: FIND-ALIAS
 * -----------------------------------------------------------------------------
 * @version 1.0.1
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
var get = help.get;
var is  = help.is;
var log = help.log;

/**
 * @typedef {Object<string, string>} Alias
 */

/** @type {!RegExp} */
var ALIAS = /^shortcuts?|alias$/;

var findAlias = require('./find-alias');

/**
 * @param {string} taskDir
 * @param {!Config} config
 * @return {(?Alias|boolean)}
 */
module.exports = function findAlias(taskDir, config) {

  /** @type {?Alias} */
  var alias;
  /** @type {!TypeError} */
  var error;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;

  alias = get(config, ALIAS)[0] || null;

  if ( !is('stringMap', alias) ) {
    error = 'invalid `config.alias` (must be an object with string values)';
    error = new TypeError(error);
    log.error('Failed `act` command', error, { config: config });
    return false;
  }

  return alias || findAlias(taskDir);
};
