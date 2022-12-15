/**
 * ---------------------------------------------------------------------------
 * ACT MOCHA REPORTER: specky
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
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [spec reporter](https://github.com/mochajs/mocha/blob/master/lib/reporters/spec.js).
 * @copyright 2011-2022 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var inherits = require('util').inherits;
var chalk = require('chalk');
var Base = require('./base.js');

var OK = chalk.green(Base.symbols.ok);

module.exports = Specky;

/**
 * Initialize a new `Specky` test reporter.
 * @param {Runner} runner
 */
function Specky(runner) {

  /** @type {number} */
  var indents;
  /** @type {string} */
  var method;
  /** @type {number} */
  var fails;
  /** @type {!Object} */
  var self;

  Base.call(this, runner);

  self = this;
  indents = -1;
  fails = 0;

  runner.on('start', function() {
    console.log();
  });

  runner.on('suite', function(suite) {

    /** @type {string} */
    var msg;

    ++indents;

    if (!indents) return;

    msg = suite.title;
    msg = chalk.white(msg);
    msg = fill(indents, '  ') + msg;
    console.log(msg);
  });

  runner.on('suite end', function() {
    --indents;
    if (!indents) console.log();
  });

  runner.on('pending', function(test) {

    /** @type {string} */
    var msg;

    msg = '- ' + test.title;
    msg = chalk.yellow(msg);
    msg = fill(indents + 1, '  ') + msg;
    console.log(msg);
  });

  runner.on('pass', function(test) {

    /** @type {string} */
    var title;
    /** @type {string} */
    var msg;

    title = chalk.white(test.title);

    if (test.speed !== 'fast') {
      msg = ' (' + test.duration + 'ms)';
      msg = test.speed === 'slow'
        ? chalk.red(msg)
        : chalk.yellow(msg);
    }

    msg = OK + ' ' + title + (msg || '');
    msg = fill(indents + 1, '  ') + msg;
    console.log(msg);
  });

  runner.on('fail', function(test) {

    /** @type {string} */
    var msg;

    ++fails;
    msg = fails + ' ' + test.title;
    msg = chalk.red(msg);
    msg = fill(indents + 1, '  ') + msg;
    console.log(msg);
  });

  runner.on('end', self.epilogue.bind(self));
}

inherits(Specky, Base);
