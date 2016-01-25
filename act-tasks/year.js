/**
 * -----------------------------------------------------------------------------
 * LOCAL ACT TASK: year
 * -----------------------------------------------------------------------------
 * @file Use `$ node bin/act year` to access this file.
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

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var remap  = vitals.remap;
var to     = vitals.to;

var YEAR_FIND = /(copyright )2[0-9]{3}/ig;
var YEAR_VAL  = /^2[0-9]{3}$/;

exports['desc'] = 'updates year in entire repo';
exports['value'] = '2xxx';
exports['method'] = updateYear;

/**
 * @public
 * @param {string} year
 */
function updateYear(year) {

  /** @type {!Array<string>} */
  var filepaths;

  if ( !isYear(year) ) throw new Error('invalid value (must be a year - 2xxx)');

  filepaths = get.filepaths('.', {
    deep:        true,
    validExts:   /^js|md$/,
    invalidDirs: /^node_modules$/
  });
  insertYears(filepaths, year);
}

/**
 * @private
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
  return !!year && has(year, YEAR_VAL);
}

/**
 * @private
 * @param {!Array<string>} filepaths
 * @param {string} year
 */
function insertYears(filepaths, year) {
  year = fuse('$1', year);
  each(filepaths, function(filepath) {
    insertYear(filepath, year);
  });
}

/**
 * @private
 * @param {string} filepath
 * @param {string} year
 */
function insertYear(filepath, year) {

  /** @type {string} */
  var content;

  content = get.file(filepath);
  content = remap(content, YEAR_FIND, year);
  to.file(content, filepath);
}
