const path = require('path');
const desctructingPlugin = require('@babel/plugin-transform-destructuring');
const pipelineOpratorPlugin = require('@babel/plugin-proposal-pipeline-operator');
const babel = require('@babel/core');
const pipe = require('../src');
const assert = require('assert').strict;

describe('with-pipeline-operator-proposal-plugin', function() {
  it('code execed result', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-pipeline-operator-proposal-plugin', 'code.js'),
      {
        plugins: [
          pipe,
          [pipelineOpratorPlugin, { 'proposal': 'smart' }]
        ],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      assert.strictEqual(a, 'xXX!xXX!');
      assert.strictEqual(b, 'bBB!BBB!');
      assert.strictEqual(typeof c, 'undefined');
      assert.strictEqual(c1, 'CCC');
      assert.deepStrictEqual(d, { g: 'ggg' });
      assert.deepStrictEqual(e, { e: 'eee', f: 'fff', h: { i: 'iii' } });
      assert.strictEqual(g, 'ggg!ggg!');
      assert.strictEqual(h, 'hELLO WORLD!hELLO WORLD!');
      assert.strictEqual(x, 'aRR XXX!aRR XXX!');
      assert.strictEqual(y, 'HELLO!HELLO!');
      assert.strictEqual(z, 'wORLD!wORLD!');
      assert.strictEqual(w, 'ARR YYY');
      assert.deepStrictEqual(restArr, ['arr zzz', 'arr www', ['name']]);
    `)(assert);
  });
  it('code execed result with desctructing plugin', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-pipeline-operator-proposal-plugin', 'code.js'),
      {
        plugins: [
          pipe,
          desctructingPlugin,
          [pipelineOpratorPlugin, { 'proposal': 'smart' }]
        ],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      assert.strictEqual(a, 'xXX!xXX!');
      assert.strictEqual(b, 'bBB!BBB!');
      assert.strictEqual(typeof c, 'undefined');
      assert.strictEqual(c1, 'CCC');
      assert.deepStrictEqual(d, { g: 'ggg' });
      assert.deepStrictEqual(e, { e: 'eee', f: 'fff', h: { i: 'iii' } });
      assert.strictEqual(g, 'ggg!ggg!');
      assert.strictEqual(h, 'hELLO WORLD!hELLO WORLD!');
      assert.strictEqual(x, 'aRR XXX!aRR XXX!');
      assert.strictEqual(y, 'HELLO!HELLO!');
      assert.strictEqual(z, 'wORLD!wORLD!');
      assert.strictEqual(w, 'ARR YYY');
      assert.deepStrictEqual(restArr, ['arr zzz', 'arr www', ['name']]);
    `)(assert);
  });
  it('code execed result with plugins order reversed', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-pipeline-operator-proposal-plugin', 'code.js'),
      {
        plugins: [
          [pipelineOpratorPlugin, { 'proposal': 'smart' }],
          pipe,
        ],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      assert.strictEqual(a, 'xXX!xXX!');
      assert.strictEqual(b, 'bBB!BBB!');
      assert.strictEqual(typeof c, 'undefined');
      assert.strictEqual(c1, 'CCC');
      assert.deepStrictEqual(d, { g: 'ggg' });
      assert.deepStrictEqual(e, { e: 'eee', f: 'fff', h: { i: 'iii' } });
      assert.strictEqual(g, 'ggg!ggg!');
      assert.strictEqual(h, 'hELLO WORLD!hELLO WORLD!');
      assert.strictEqual(x, 'aRR XXX!aRR XXX!');
      assert.strictEqual(y, 'HELLO!HELLO!');
      assert.strictEqual(z, 'wORLD!wORLD!');
      assert.strictEqual(w, 'ARR YYY');
      assert.deepStrictEqual(restArr, ['arr zzz', 'arr www', ['name']]);
    `)(assert);
  });
  it('code execed result with desctructing plugin and plugin order reversed', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-pipeline-operator-proposal-plugin', 'code.js'),
      {
        plugins: [
          [pipelineOpratorPlugin, { 'proposal': 'smart' }],
          pipe,
          desctructingPlugin,
        ],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      assert.strictEqual(a, 'xXX!xXX!');
      assert.strictEqual(b, 'bBB!BBB!');
      assert.strictEqual(typeof c, 'undefined');
      assert.strictEqual(c1, 'CCC');
      assert.deepStrictEqual(d, { g: 'ggg' });
      assert.deepStrictEqual(e, { e: 'eee', f: 'fff', h: { i: 'iii' } });
      assert.strictEqual(g, 'ggg!ggg!');
      assert.strictEqual(h, 'hELLO WORLD!hELLO WORLD!');
      assert.strictEqual(x, 'aRR XXX!aRR XXX!');
      assert.strictEqual(y, 'HELLO!HELLO!');
      assert.strictEqual(z, 'wORLD!wORLD!');
      assert.strictEqual(w, 'ARR YYY');
      assert.deepStrictEqual(restArr, ['arr zzz', 'arr www', ['name']]);
    `)(assert);
  });
});
