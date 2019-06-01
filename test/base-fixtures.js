const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const pipe = require('../src');

const transform = (dir) => babel.transformFileSync(path.join(__dirname, 'fixtures', dir, 'input.js'), {
  plugins: [pipe],
}).code;

describe('babel-plugin-pipe', function() {
  const fixturesDirNameArr = fs.readdirSync(path.join(__dirname, 'fixtures'));
  fixturesDirNameArr.forEach(dir => {
    it(`${dir}`, function() {
      const actual = transform(dir);
      const expected = fs.readFileSync(path.join(__dirname, 'fixtures', dir, 'output.js'), {
        encoding: 'utf-8'
      });
      assert.strictEqual(actual, expected);
    });
  })
  // describe('#1 xxx', function () {
  //   it('xxxx', function () {
  //     const actual = babel.transformFileSync(path.join(__dirname, 'fixtures/obj/input.js'), {
  //       plugins: [pipe]
  //     }).code;
  //     const expected = fs.readFileSync(path.join(__dirname, 'fixtures/obj/output.js'), 'utf-8');
  //     assert.equal(actual, expected);
  //     // console.log(actual.replace('\n', '\\n'))
  //   });
  // });
})
