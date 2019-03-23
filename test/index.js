const babel = require("@babel/core");
const path = require('path');
const pipeline = require('../src');
const a = babel.transformFileSync(path.join(__dirname, 'code.js'), {
  plugins: [pipeline],
});

console.log(a.code);