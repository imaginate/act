/**
 * -----------------------------------------------------------------------------
 * ACT MOCHA REPORTER: specky
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [spec reporter](https://github.com/mochajs/mocha/blob/master/lib/reporters/spec.js).
 * @copyright 2017 TJ Holowaychuk <tj@vision-media.ca>
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
