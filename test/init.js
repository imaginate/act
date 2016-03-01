/**
 * -----------------------------------------------------------------------------
 * LOCAL ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ npm test` to access this file.
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

var log = require('log-ocd')();
var fuse = require('node-vitals')('fuse');
var Mocha = require('mocha');

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

  require('../test/setup');

  mocha = new Mocha();
  mocha.reporter('specky');
  mocha.ui('act');
  mocha.addFile('tests.js');

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
