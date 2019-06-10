const path = require('path');
const babel = require('@babel/core');
const pipe = require('../src');
const assert = require('assert').strict;

const assertCode = `
  assert.strictEqual(a, 'xXX!xXX!');
  assert.strictEqual(b, 'bBB!BBB!');
  assert.strictEqual(typeof c, 'undefined');
  assert.strictEqual(c1, 'CCC');
  assert.deepStrictEqual(d, { g: 'ggg' });
  assert.deepStrictEqual(e, { e: 'eee', f: 'fff', h: { i: 'iii' } });
  assert.strictEqual(g, 'ggg!ggg!');
  assert.strictEqual(h, 'hELLO WORLD!hELLO WORLD!');
  assert.strictEqual(w, 'www!www!');
  assert.strictEqual(w1, 'HELLO WORLD!HELLO WORLD!');
  assert.strictEqual(x, 'aRR XXX!aRR XXX!');
  assert.strictEqual(y, 'HELLO!HELLO!');
  assert.strictEqual(z, 'wORLD!wORLD!');
  assert.strictEqual(arrW, 'ARR YYY');
  assert.deepStrictEqual(restArr, ['arr zzz', 'arr www', ['name']]);
`;

describe('with-pipeline-operator-proposal-plugin', function() {
  it('code execed result', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-pipeline-operator-proposal-plugin', 'code.js'),
      {
        plugins: [
          pipe,
          ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'smart' }]
        ],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      ${assertCode}
    `)(assert);
  });
  it('code execed result with desctructing plugin', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-pipeline-operator-proposal-plugin', 'code.js'),
      {
        plugins: [
          pipe,
          '@babel/plugin-transform-destructuring',
          ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'smart' }]
        ],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      ${assertCode}
    `)(assert);
  });
  it('code execed result with desctructing plugin and plugin order reversed', function() {
    const compiledCode = babel.transformFileSync(
      path.join(__dirname, 'with-pipeline-operator-proposal-plugin', 'code.js'),
      {
        plugins: [
          pipe,
          ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'smart' }],
          '@babel/plugin-transform-destructuring',
        ],
      }
    ).code;
    new Function('assert', `
      ${compiledCode}
      ${assertCode}
    `)(assert);
  });
});
