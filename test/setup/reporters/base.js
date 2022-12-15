/**
 * ---------------------------------------------------------------------------
 * ACT MOCHA REPORTER: base
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

var chalk = require('chalk');

var Mocha = require('mocha');
var Runnable = Mocha.Runnable;
var Suite = Mocha.Suite;
var Base = Mocha.reporters.Base;
var ms = require('mocha/lib/ms.js');

module.exports = Base;

/**
 * Replace `Runnable.prototype.fullTitle`.
 *
 * @private
 * @return {string}
 */
Runnable.prototype.fullTitle = function fullTitle() {
    return fuse(this.parent.fullTitle(), ' -> ', this.title);
};

/**
 * Replace `Suite.prototype.fullTitle`.
 *
 * @private
 * @return {string}
 */
Suite.prototype.fullTitle = function fullTitle() {
    /** @const {string} */
    const parentTitle = this.parent?.fullTitle() || '';
    return fuse(parentTitle, parentTitle && ' -> ', this.title);
};

/**
 * Replace `Base.list`.
 *
 * @private
 * @param {Array} failures
 */
Base.list = function list(failures) {

    console.log(); // log empty line

    /** @const {number} */
    const len = failures.length - 1;
    each(failures, function(test, i) {

        /** @const {string} */
        const title = fuse('  ', ++i, ') ', test.fullTitle());
        log.fail(title);

        /** @const {?Error} */
        const newerr = is.error(test.err)
            ? null
            : new Error();
        if (newerr) {
            newerr.name    = test.err.name;
            newerr.message = test.err.message;
            newerr.stack   = test.err.stack;
        }
        /** @const {!Error} */
        const err = newerr || test.err;

        if (same(i, len)) {
            log.error.setFormat({
                linesAfter: 0
            });
        }

        log.error(err);
    });
};

/**
 * Replace `Base.prototype.epilogue`.
 *
 * @private
 * @type {function}
 */
Base.prototype.epilogue = function epilogue() {

    /** @const {!Object} */
    const stats = this.stats;

    console.log();

    /** @const {string} */
    const time = chalk.white.bold(fuse(
        ' (', ms(stats.duration), ')'
    ));
    /** @const {string} */
    const passMsg = chalk.green.bold(fuse(
        ' ', stats.passes || 0,' passing'
    ));
    console.log(fuse(' ', passMsg, time));

    if (stats.pending) {
        /** @const {string} */
        const pendingMsg = chalk.yellow.bold(fuse(
            '  ', stats.pending, ' pending'
        ));
        console.log(pendingMsg);
    }

    if (stats.failures) {
        /** @const {string} */
        const failMsg = chalk.red.bold(fuse(
            '  ', stats.failures, ' failing'
        ));
        console.log(failMsg);
        Base.list(this.failures);
    }

    console.log();
};
