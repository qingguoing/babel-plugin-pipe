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
      assert(a, 'xxx');
      assert(b, 'bbb');
      assert(typeof c, 'undefined');
      assert(c1, 'ccc');
      assert(d, {
        d: 'ddd',
        e: 'eee',
        f: 'fff',
      });
    `)(assert);
  });
  it('code execed result reversed', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-destructing-plugin', 'code.js'),
      {
        plugins: [desctructingPlugin, pipe],
      }
    ).code;

    new Function('assert', `
      ${compiledCode}
      assert(a, 'xxx');
      assert(b, 'bbb');
      assert(typeof c, 'undefined');
      assert(c1, 'ccc');
      assert(d, {
        d: 'ddd',
        e: 'eee',
        f: 'fff',
      });
    `)(assert);
  });
});
