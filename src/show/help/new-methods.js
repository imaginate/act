/**
 * -----------------------------------------------------------------------------
 * ACT: NEW-HELP-METHODS
 * -----------------------------------------------------------------------------
 * @version 1.1.1
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

var help = require('../../helpers');
var each = help.each;
var fuse = help.fuse;
var is   = help.is;

/**
 * @typedef {Array<?HelpMethod>} HelpMethods
 */

var newHelpMethod = require('./new-method');

/**
 * @param {(!Object|undefined)} methods
 * @param {string} taskName
 * @return {?HelpMethods}
 */
module.exports = function newHelpMethods(methods, taskName) {

  /** @type {!HelpMethods} */
  var result;
  /** @type {boolean} */
  var error;

  if ( !is.obj(methods) ) return null;

  result = [];
  each(methods, function(method, name) {
    method = newHelpMethod(name, method, taskName);
    fuse.val(result, method);
    error = error || is.null(method);
  });
  result.error = error;
  return result;
};
