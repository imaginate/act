/**
 * ---------------------------------------------------------------------------
 * ACT UNIT TESTS
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

suite('act tests', function() {

    beforeEach(function() {
        global.actOut = [];
    });

    test('act free', function() {
        assert(act('free'));
        assert(actOut[0] === 'free');
    });

    test('act real', function() {
        assert(act('real'));
        assert(actOut[0] === 'free');
    });

    test('act split alias names', function() {
        assert(act('split alias names'));
        assert(actOut[0] === 'free');
        assert(actOut[1] === 'free');
        assert(actOut[2] === 'free');
    });

    test('act only= live free', function() {
        assert(act('only= live free'));
        assert(actOut[0] === 'only');
        assert(actOut[1] === 'you');
        assert(actOut[2] === 'live');
        assert(actOut[3] === 'free');
    });

    test('act only -one= 1', function() {
        assert(act('only -one= 1'));
        assert(actOut[0] === 'only');
        assert(actOut[1] === 'one');
        assert(actOut[2] ===  '1');
    });

    test('act only -one= 2 -you', function() {
        assert(act('only -one= 2 -you'));
        assert(actOut[0] === 'only');
        assert(actOut[1] === 'one');
        assert(actOut[2] ===  '2');
        assert(actOut[3] === 'only');
        assert(actOut[4] === 'you');
    });

    test('act only= 4 -you -one= 3 -one', function() {
        assert(act('only= 4 -you -one= 3 -one'));
        assert(actOut[0] === 'only');
        assert(actOut[1] === 'you');
        assert(actOut[2] ===  '4');
        assert(actOut[3] === 'only');
        assert(actOut[4] === 'one');
        assert(actOut[5] ===  '3');
        assert(actOut[6] === 'only');
        assert(actOut[7] === 'one');
        assert(actOut[8] ===  '4');
    });

    test('act good= groovy', function() {
        assert(act('good= groovy'));
        assert(actOut[0] === 'only');
        assert(actOut[1] === 'you');
        assert(actOut[2] ===  'groovy');
    });

    test('act upit', function() {
        assert(act('upit'));
        assert(actOut[0] === 'only');
        assert(actOut[1] === 'you');
        assert(actOut[2] ===  '4');
        assert(actOut[3] === 'only');
        assert(actOut[4] === 'one');
        assert(actOut[5] ===  '3');
        assert(actOut[6] === 'only');
        assert(actOut[7] === 'one');
        assert(actOut[8] ===  '4');
    });
});
