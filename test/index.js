const babel = require("@babel/core");
const path = require('path');
const pipe = require('../src');
const a = babel.transformFileSync(path.join(__dirname, 'code.js'), {
  plugins: [pipe],
  presets: [
    [
      '@babel/preset-env',
    ],
  ],
});

console.log(a.code);