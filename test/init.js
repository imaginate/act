/**
 * -----------------------------------------------------------------------------
 * LOCAL ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `act test` to access this file.
 *
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

const { resolve } = require('path');
const log = require('log-ocd')();
const fuse = require('node-vitals')('fuse');
const Mocha = require('mocha');
const ROOT_DIRPATH = resolve(__dirname);

log.error.setConfig({
  'throw': false,
  'exit':  true
});

runTests();

/**
 * @type {function}
 */
function runTests() {

  /** @type {!Mocha} */
  var mocha;

  log.debug('Starting `act` tests');

  require(resolve(ROOT_DIRPATH, 'setup'));

  mocha = new Mocha();
  mocha.reporter('specky');
  mocha.ui('act');
  mocha.addFile(resolve(ROOT_DIRPATH, 'tests.js'));

  try {
    mocha.run(function() {
      log.pass('Finished `act` tests');
    });
  }
  catch (err) {
    err.name = fuse('Internal `test` ', err.name || 'Error');
    log.error(err);
  }
}
