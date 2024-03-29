/**
 * ---------------------------------------------------------------------------
 * LOCAL ACT TASK: test
 * ---------------------------------------------------------------------------
 * @file Use `act test` to access this file.
 * @version 1.5.0
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](https://jsdoc.app)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 * @see [Node Path](https://nodejs.org/dist/latest-v14.x/docs/api/path.html)
 */

'use strict';

//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports.desc = 'runs the act tests';
exports.method = test;
exports.done = false;

//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

const { resolve } = require('path');

//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

const INIT_TEST_PATH = resolve(__dirname, '../test/init.js');

//////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @return {void}
 */
function test() {
    require(INIT_TEST_PATH);
}

//////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////

