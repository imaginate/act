/**
 * -----------------------------------------------------------------------------
 * ACT: NEW-HELP-METHOD
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

var help = require('../../helpers');
var fuse = help.fuse;
var get  = help.get;
var is   = help.is;
var log  = help.log;

/**
 * @typedef {{
 *   name: string,
 *   desc: string,
 *   val:  string
 * }} HelpMethod
 */

/**
 * @param {string} name
 * @param {(!Object|function)} method
 * @param {string} taskName
 * @return {?HelpMethod}
 */
module.exports = function newHelpMethod(name, method, taskName) {

  /** @type {!TypeError} */
  var error;
  /** @type {string} */
  var title;

  if ( !is._obj(method) || ( !is.func(method) && !is.func(method.method) ) ) {
    title = fuse('Failed `', taskName, '` task');
    error = fuse('invalid `exports.methods.', name, '.method`');
    error = fuse(error, ' (must be a function)');
    error = new TypeError(error);
    log.error(title, error, { method: method });
    return null;
  }

  return {
    name: name,
    desc: get(method, /^desc/)[0] || '',
    val:  get(method, /^val/)[0]  || ''
  };
};
