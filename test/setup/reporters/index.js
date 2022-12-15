/**
 * -----------------------------------------------------------------------------
 * ACT MOCHA REPORTER: setup
 * -----------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

const { reporters } = require('mocha');
reporters.specky = require('./specky.js');
