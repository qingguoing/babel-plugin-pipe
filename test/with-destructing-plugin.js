const path = require('path');
const desctructingPlugin = require('@babel/plugin-transform-destructuring');
const babel = require('@babel/core');
const pipe = require('../src');
const assert = require('assert').strict;

describe('with-plugin-transform-destructing', function() {
  it('code execed result', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-destructing-plugin', 'code.js'),
      {
        plugins: [pipe, desctructingPlugin],
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
      assert.strictEqual(x, 'arr xxx');
      assert.strictEqual(y, 'hello');
      assert.strictEqual(z, 'world');
      assert.deepStrictEqual(restArr, ['arr yyy', 'arr zzz', 'arr www', [ 'name' ]]);
    `)(assert);
  });
  it('code execed result width plugins order reversed', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-destructing-plugin', 'code.js'),
      {
        plugins: [desctructingPlugin, pipe],
      }
    ).code;

    new Function('assert', `
      ${compiledCode}
      console.log(typeof d);
      assert.strictEqual(a, 'xxx');
      assert.strictEqual(b, 'bbb');
      assert.strictEqual(typeof c, 'undefined');
      assert.strictEqual(c1, 'ccc');
      assert.strictEqual(typeof d, 'undefined');
      assert.deepStrictEqual(e, {
        e: 'eee',
        f: 'fff',
        h: {
          i: 'iii'
        }
      });
      assert.strictEqual(g, 'ggg');
      assert.strictEqual(h, 'hello world');
      assert.strictEqual(x, 'arr xxx');
      assert.strictEqual(y, 'hello');
      assert.strictEqual(z, 'world');
      assert.deepStrictEqual(restArr, ['arr yyy', 'arr zzz', 'arr www', [ 'name' ]]);
    `)(assert);
  });
});
