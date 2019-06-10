const path = require('path');
const babel = require('@babel/core');
const pipe = require('../src');
const assert = require('assert').strict;

describe('with-plugin-transform-destructing', function() {
  it('code execed result', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-destructing-plugin', 'code.js'),
      {
        plugins: [pipe, '@babel/plugin-transform-destructuring'],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      assert.strictEqual(a, 'xxx');
      assert.strictEqual(b, 'bbb');
      assert.strictEqual(typeof c, 'undefined');
      assert.strictEqual(c1, 'ccc');
      assert.deepStrictEqual(d, {
        g: 'ggg',
      });
      assert.deepStrictEqual(e, {
        e: 'eee',
        f: 'fff',
        h: {
          i: 'iii'
        }
      });
      assert.strictEqual(g, 'ggg');
      assert.strictEqual(h, 'hello world');
      assert.strictEqual(w, 'www');
      assert.strictEqual(w1, 'hello world');
      assert.strictEqual(x, 'arr xxx');
      assert.strictEqual(y, 'hello');
      assert.strictEqual(z, 'world');
      assert.deepStrictEqual(restArr, ['arr yyy', 'arr zzz', 'arr www', [ 'name' ]]);
      assert.strictEqual(arrU, 'uuu');
      assert.strictEqual(arrV, 'vvv');
      assert.strictEqual(arrW, 'hello world');
    `)(assert);
  });
});
