/**
 * -----------------------------------------------------------------------------
 * ACT: LOAD-CONFIG
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

var is = require('../helpers').is;

/**
 * @typedef {Object<string, string>} Config
 */

var findConfig = require('./find-config');
var loadAlias  = require('./load-alias');

/**
 * @param {string} taskDir
 * @return {?Config}
 */
module.exports = function loadConfig(taskDir) {

  /** @type {(?Config|boolean)} */
  var config;
  /** @type {!TypeError} */
  var error;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;

  config = !!taskDir && findConfig(taskDir);

  if ( is.same(config, false) ) return null;

  config = config || {};
  config = {
    'alias': loadAlias(taskDir, config),
    'throw': getValue(config, 'throw', false),
    'done':  getValue(config, 'done',  true),
    'exit':  getValue(config, 'exit',  true)
  };
  return is.same(config.alias, false) ? null : config;
};

/**
 * @private
 * @param {!Config} config
 * @param {string} key
 * @param {boolean} defaultVal
 * @return {boolean}
 */
function getValue(config, key, defaultVal) {
  return is.bool( config[key] ) ? config[key] : defaultVal;
}
