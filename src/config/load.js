/**
 * -----------------------------------------------------------------------------
 * ACT: LOAD-CONFIG
 * -----------------------------------------------------------------------------
 * @version 1.4.0
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

var help = require('../helpers');
var is   = help.is;
var log  = help.log;
var same = help.same;

/**
 * @typedef {Object<string, string>} Config
 */

/** @type {!Config} */
var DEFAULTS = require('./defaults');

var findConfig = require('./find');
var loadAlias  = require('../alias/load');

/**
 * @param {string} taskDir
 * @return {?Config}
 */
module.exports = function loadConfig(taskDir) {

  /** @type {(?Config|boolean)} */
  var config;

  config = !!taskDir && findConfig(taskDir);

  if ( same(config, false) ) return null;

  config = config || {};
  config = {
    'alias': loadAlias(taskDir, config),
    'throw': getValue(config, 'throw', false),
    'done':  getValue(config, 'done',  true),
    'exit':  getValue(config, 'exit',  true)
  };

  if ( same(config.alias, false) ) return null;

  return updateLogOCD(config);
};

/**
 * @private
 * @param {!Config} config
 * @param {string} key
 * @return {boolean}
 */
function getValue(config, key, defaultVal) {
  return is.bool( config[key] )
    ? config[key]
    : DEFAULTS[key];
}

/**
 * @private
 * @param {!Config} config
 * @return {!Config}
 */
function updateLogOCD(config) {

  log.error.setConfig({
    'throw': config['throw'],
    'exit':  config['exit']
  });

  if (!config.done) {
    log.pass.setConfig({
      'logger': function(){}
    });
  }

  return config;
}
