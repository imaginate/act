/**
 * ---------------------------------------------------------------------------
 * VITALS UNIT TESTS: setup
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

const { resolve } = require('path');

process.chdir(resolve(__dirname, 'reporters'));

require('./helpers');
require('./interface');
require('./reporters');
