/**
 * -----------------------------------------------------------------------------
 * ACT: HELPERS
 * -----------------------------------------------------------------------------
 * @version 1.0.1
 * @see [act]{@link https://github.com/imaginate/act}
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

// see https://github.com/imaginate/are
var are = require('node-are');
exports.is  = are.is;
exports.are = are.are;

// see https://github.com/imaginate/vitals
var vitals = require('node-vitals')('all');
exports.amend  = vitals.amend;
exports.copy   = vitals.copy;
exports.create = vitals.create;
exports.cut    = vitals.cut;
exports.each   = vitals.each;
exports.fill   = vitals.fill;
exports.freeze = vitals.freeze;
exports.fuse   = vitals.fuse;
exports.get    = vitals.get;
exports.has    = vitals.has;
exports.remap  = vitals.remap;
exports.roll   = vitals.roll;
exports.run    = vitals.run;
exports.seal   = vitals.seal;
exports.slice  = vitals.slice;
exports.until  = vitals.until;

// see https://github.com/imaginate/log-ocd
var log = require('log-ocd')();
log.error.setConfig({
  'ocdmap': true,
  'throw': false,
  'exit':  true
});
log.pass.setFormat({
  'linesAfter': 0
});
exports.log = log;
