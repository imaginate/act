/**
 * -----------------------------------------------------------------------------
 * ACT UNIT TESTS
 * -----------------------------------------------------------------------------
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * Supporting Libraries:
 * @see [vitals]{@link https://github.com/imaginate/vitals}
 * @see [log-ocd]{@link https://github.com/imaginate/log-ocd}
 *
 * Annotations:
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

suite('act tests', function() {

  beforeEach(function() {
    global.actOut = [];
  });

  test('act free', function() {
    act('free');
    assert( actOut[0] === 'free' );
  });

  test('act real', function() {
    act('real');
    assert( actOut[0] === 'free' );
  });

  test('act only= live free', function() {
    act('only= live free');
    assert( actOut[0] === 'only' );
    assert( actOut[1] === 'you'  );
    assert( actOut[2] === 'live' );
    assert( actOut[3] === 'free' );
  });

  test('act only -one= 1', function() {
    act('only -one= 1');
    assert( actOut[0] === 'only' );
    assert( actOut[1] === 'one'  );
    assert( actOut[2] ===  '1'   );
  });

  test('act only -one= 2 -you', function() {
    act('only -one= 2 -you');
    assert( actOut[0] === 'only' );
    assert( actOut[1] === 'one'  );
    assert( actOut[2] ===  '2'   );
    assert( actOut[3] === 'only' );
    assert( actOut[4] === 'you'  );
  });

  test('act only= 4 -you -one= 3 -one', function() {
    act('only= 4 -you -one= 3 -one');
    assert( actOut[0] === 'only' );
    assert( actOut[1] === 'you'  );
    assert( actOut[2] ===  '4'   );
    assert( actOut[3] === 'only' );
    assert( actOut[4] === 'one'  );
    assert( actOut[5] ===  '3'   );
    assert( actOut[6] === 'only' );
    assert( actOut[7] === 'one'  );
    assert( actOut[8] ===  '4'   );
  });

  test('act upit', function() {
    act('upit');
    assert( actOut[0] === 'only' );
    assert( actOut[1] === 'you'  );
    assert( actOut[2] ===  '4'   );
    assert( actOut[3] === 'only' );
    assert( actOut[4] === 'one'  );
    assert( actOut[5] ===  '3'   );
    assert( actOut[6] === 'only' );
    assert( actOut[7] === 'one'  );
    assert( actOut[8] ===  '4'   );
  });
});
