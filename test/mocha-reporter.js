/**
 * -----------------------------------------------------------------------------
 * ACT UNIT TESTS: MOCHA REPORTER
 * -----------------------------------------------------------------------------
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

// globally append all helpers
require('./setup.js');

// get the Runnable constructor
var Runnable = require('../node_modules/mocha/lib/runnable.js');

/**
 * Replace the fullTitle method with a different separator.
 * @return {string}
 */
Runnable.prototype.fullTitle = function() {
  return this.parent.fullTitle() + ' -> ' + this.title;
};

// get the reporter base
var Base = require('../node_modules/mocha/lib/reporters/base.js');

/**
 * Replace the Base reporter list method.
 * @param {Array} failures
 */
Base.list = function(failures) {

  /** @type {number} */
  var last;

  console.log(); // log empty line

  last = failures.length - 1;
  each(failures, function(test, i) {

    /** @type {!Error} */
    var error;
    /** @type {string} */
    var title;

    title = test.fullTitle();
    title = fuse('  ', ++i, ') ', title);
    log.fail(title);

    error = test.err;

    if ( !is.error(error) ) {
      error = new Error();
      error.name = test.err.name;
      error.message = test.err.message;
      error.stack = test.err.stack;
    }

    if ( is.same(i, last) ) log.error.setFormat({ 'linesAfter': 0 });

    log.error(error);
  });
};

/**
 * -----------------------------------------------------------------------------
 * DEFAULT SPEC REPORTER
 * -----------------------------------------------------------------------------
 * The below code is copied and pasted from the Mocha module located at
 *   mocha/lib/reporters/spec.js with only two changes - the inherits path has
 *   been updated and the runner's start event has been removed.
 *
 * @see [Mocha]{@link https://github.com/mochajs/mocha}
 * @copyright 2011-2016 TJ Holowaychuk <tj@vision-media.ca>
 */

var inherits = require('util').inherits;
var color = Base.color;
var cursor = Base.cursor;

/**
 * Expose `Spec`.
 */

exports = module.exports = Spec;

/**
 * Initialize a new `Spec` test reporter.
 *
 * @api public
 * @param {Runner} runner
 */
function Spec(runner) {
  Base.call(this, runner);

  var self = this;
  var indents = 0;
  var n = 0;

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on('suite', function(suite) {
    ++indents;
    console.log(color('suite', '%s%s'), indent(), suite.title);
  });

  runner.on('suite end', function() {
    --indents;
    if (indents === 1) {
      console.log();
    }
  });

  runner.on('pending', function(test) {
    var fmt = indent() + color('pending', '  - %s');
    console.log(fmt, test.title);
  });

  runner.on('pass', function(test) {
    var fmt;
    if (test.speed === 'fast') {
      fmt = indent()
        + color('checkmark', '  ' + Base.symbols.ok)
        + color('pass', ' %s');
      cursor.CR();
      console.log(fmt, test.title);
    } else {
      fmt = indent()
        + color('checkmark', '  ' + Base.symbols.ok)
        + color('pass', ' %s')
        + color(test.speed, ' (%dms)');
      cursor.CR();
      console.log(fmt, test.title, test.duration);
    }
  });

  runner.on('fail', function(test) {
    cursor.CR();
    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
  });

  runner.on('end', self.epilogue.bind(self));
}

/**
 * Inherit from `Base.prototype`.
 */
inherits(Spec, Base);
