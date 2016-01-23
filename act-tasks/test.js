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

exports['desc'] = 'run act unit tests';
exports['method'] = runTests;

/**
 * @public
 * @type {function}
 */
function runTests() {

  /** @type {!ChildProcess} */
  var child;
  /** @type {!Array<string>} */
  var args;
  /** @type {!Object} */
  var opts;

  log.debug('Starting `act` tests');

  args = [
    './node_modules/mocha/bin/_mocha',
    '--colors',
    '--reporter',
    'test/mocha-reporter.js',
    './test/tests.js'
  ];
  opts = { 'stdio': 'inherit' };

  try {
    child = cp.spawn('node', args, opts);
  }
  catch (error) {
    error.name = fuse('Internal ', error.name || 'Error');
    log.error(error);
  }

  child.on('close', function() {
    log.pass('Finished `act` tests');
  });
}
