const path = require('path');
const babel = require('@babel/core');
const pipe = require('./src');
const a = babel.transformFileSync(
  path.join(__dirname, 'code.js'),
  {
    plugins: [
      pipe,
      [ "@babel/plugin-proposal-pipeline-operator", { "proposal": "smart" } ]
    ],
  }
);

console.log(a.code);
