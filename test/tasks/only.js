/**
 * ---------------------------------------------------------------------------
 * ACT TEST TASK: only
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [Vitals](https://github.com/imaginate/vitals)
 * @see [LogOCD](https://github.com/imaginate/log-ocd)
 *
 * Annotations:
 * @see [JSDoc3](https://jsdoc.app)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

exports.desc = 'only simple tasks';
exports.value = 'require-all';
exports.default = 'only -you';
exports.methods = {
  one: {
    desc: 'only single desire',
    value: 'numero',
    method: onlyOne
  },
  you: {
    desc: 'only you crazy lazy',
    value: 'who-r-u',
    method: onlyYou
  }
};

/**
 * @public
 * @param {string} numero
 * @return {void}
 */
function onlyOne(numero) {
    fuse(actOut, 'only', 'one', numero);
}

/**
 * @public
 * @param {string} you
 * @return {void}
 */
function onlyYou(you) {
    fuse(actOut, 'only', 'you', you);
}
