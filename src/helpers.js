/**
 * -----------------------------------------------------------------------------
 * ACT: HELPERS
 * -----------------------------------------------------------------------------
 * @version 1.4.0
 * @see [act]{@link https://github.com/imaginate/act}
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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

// see https://github.com/imaginate/vitals
var vitals = require('node-vitals')('base', 'fs');
exports.copy   = vitals.copy;
exports.cut    = vitals.cut;
exports.each   = vitals.each;
exports.fill   = vitals.fill;
exports.fuse   = vitals.fuse;
exports.get    = vitals.get;
exports.has    = vitals.has;
exports.is     = vitals.is;
exports.remap  = vitals.remap;
exports.roll   = vitals.roll;
exports.same   = vitals.same;
exports.slice  = vitals.slice;
exports.to     = vitals.to;
exports.until  = vitals.until;

// see https://github.com/imaginate/log-ocd
var log = require('log-ocd')();

log.error.setConfig({
  'ocdmap': true,
  'throw':  false,
  'exit':   true
});

log.error.setFormat({
  'lineLimit': 80
});

log.pass.setFormat({
  'linesAfter': 0
});

exports.log = log;

//////////////////////////////////////////////////////////////////////////////
// CUSTOM IS METHODS

var has = vitals.has;

/** @type {!RegExp} */
var VERSION = /^-+v(?:ersion)?$/;
/** @type {!RegExp} */
var HELP = /^\?|-+h(?:elp)?$/;

/**
 * @param {Args} args
 * @return {boolean}
 */
exports.is.help = function isHelp(args) {
  return !args.length || has(args[0], HELP);
};

/**
 * @param {Args} args
 * @return {boolean}
 */
exports.is.version = function isVersion(args) {
  return has(args[0], VERSION);
};
