### babel-plugin-pipeline

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]

一款协助处理对象解构过程中的 null 和 undefined 的 babel 插件

```js
// before
const { a } = test;
```

```js
// after
const { a } = test || {};
```

### how to use
1. install

```js
npm i -D babel-plugin-pipe
```

2. 同其它正常的 babel 插件一样开启使用，例如：可以在 `.babelrc` 文件的 `plugins` 使用，**但要把该插件放在数组的第一位，防止其它 babel 插件对当前的影响**

3. 文件顶部增加 `@pipe` 的注释，插件会自动对文件内的对象解构进行转换，对于需要使用原生用法的现象，可以通过增加 `@pipe-next-line-disabled` 或者 `@pipe-next-line-disabled` 注释来关闭该插件的转换

```js
// @pipe
const { a1 } = test;
// @pipe-next-line-disabled
const { a2: b2 } = test;
const { a4: b4 = 'xxx' } = test; // @pipe-line-disabled
```

#### WARNING

对于下面这种格式，默认您已经对变量 c7 的格式做了兜底处理，所以插件不会再增加额外的兜底处理。
```js
// before
const { a7: { b7 } = c7 } = test;
const { a8: { b8 } = {} } = test;
```

```js
// @after
const { a7: _temp } = test || {},
      { b7 } = _temp || c7;
const { a8: _temp2 } = test || {},
      { b8 } = _temp2 || {};
```

### @babel/plugin-proposal-pipeline-operator

可以与 [@babel/plugin-proposal-pipeline-operator](https://babeljs.io/docs/en/next/babel-plugin-proposal-pipeline-operator.html) 插件一起配合使用，例如：

```js
// before
// 其中 filterA/filterB/filterC 是已经定义后的方法
const {
  b = '' |> filterA |> filterC |> filterB
} = obj;
```

```js
// after
const { b: _temp } = obj || {},
      b = (_temp || '') |> filterA |> filterC |> filterB;
```

格式如下：

```js
const { a = '此处是默认值' |> filterA } = test;
```

`pipeline-operator proposal` 语法请参考[插件](https://babeljs.io/docs/en/next/babel-plugin-proposal-pipeline-operator.html)文档。

### LICENSE
MIT

[npm-image]: https://badgen.net/npm/v/babel-plugin-pipe
[npm-url]: https://www.npmjs.com/package/babel-plugin-pipe
[travis-image]: https://travis-ci.com/qingguoing/babel-plugin-pipe.svg?branch=master
[travis-url]: https://travis-ci.com/qingguoing/babel-plugin-pipe