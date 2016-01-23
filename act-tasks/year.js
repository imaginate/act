/**
 * -----------------------------------------------------------------------------
 * ACT TASK: year
 * -----------------------------------------------------------------------------
 * @file Use `$ node act year` to access this file.
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

// globally append all of are, vitals, and log-ocd methods
require('./_helpers');

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

  if ( !isYear(year) ) throw new Error('invalid year for act year task');

  filepaths = get.filepaths('.', {
    validExts:   '.js',
    invalidExts: '.json'
  });
  insertYears('.', filepaths, year);

  filepaths = get.filepaths('example', {
    deep:        true,
    validExts:   '.js',
    invalidExts: '.json'
  });
  insertYears('example', filepaths, year);

  filepaths = get.filepaths('src', {
    deep:        true,
    validExts:   '.js',
    invalidExts: '.json'
  });
  insertYears('src', filepaths, year);
}

/**
 * @private
 * @param {string} year
 * @return {boolean}
 */
function isYear(year) {
  return !!year && has(year, /^2[0-9]{3}$/);
}

/**
 * @private
 * @param {string} base
 * @param {!Array<string>} filepaths
 * @param {string} year
 */
function insertYears(base, filepaths, year) {
  base = fuse(base, '/');
  year = fuse('$1', year);
  each(filepaths, function(filepath) {
    filepath = fuse(base, filepath);
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
  /** @type {!RegExp} */
  var regex;

  regex = /(\@copyright )2[0-9]{3}/g;
  content = get.file(filepath);
  content = remap(content, regex, year);
  to.file(content, filepath);
}
