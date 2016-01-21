/**
 * -----------------------------------------------------------------------------
 * ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ node act test` to access this file.
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

var cp = require('child_process');

// globally append all of are, vitals, and log-ocd methods
require('./_helpers');

exports['desc'] = 'run the unit tests for act';
exports['method'] = runTests;

/**
 * @public
 * @type {function}
 */
function runTests() {

  /** @type {string} */
  var result;
  /** @type {string} */
  var chunks;

  logStart();

  result = cp.spawn('node', [
    './node_modules/mocha/bin/mocha',
    '--colors',
    '--require',
    './test/_setup.js',
    './test/tests.js'
  ]);
  chunks = '';
  result.stdout.on('data', function(chunk) {
    chunk = chunk.toString();
    chunks = fuse(chunks, chunk);
  });
  result.stdout.on('close', function() {
    chunks = cut(chunks, /^\n/);
    console.log(chunks);
    logEnd();
  });
}

/**
 * @private
 * @type {function}
 */
function logStart() {
  log.debug.setFormat({ 'linesAfter': 0 });
  log.debug('Starting `act` tests');
  log.debug.resetFormat();
}

/**
 * @private
 * @type {function}
 */
function logEnd() {
  log.pass.setFormat({
    'linesBefore': 0,
    'linesAfter':  0
  });
  log.pass('Finished `act` tests');
  log.pass.resetFormat();
}
