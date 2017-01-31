/**
 * -----------------------------------------------------------------------------
 * ACT TEST TASK: only
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

exports['desc'] = 'only simple tasks';
exports['value'] = 'require-all';
exports['default'] = 'only -you';
exports['methods'] = {
  'one': {
    'desc': 'only single desire',
    'value': 'numero',
    'method': onlyOne
  },
  'you': {
    'desc': 'only you crazy lazy',
    'value': 'who-r-u',
    'method': onlyYou
  }
};

/**
 * @public
 * @param {string} numero
 */
function onlyOne(numero) {
  fuse(actOut, 'only', 'one', numero);
}

/**
 * @public
 * @param {string} you
 */
function onlyYou(you) {
  fuse(actOut, 'only', 'you', you);
}
