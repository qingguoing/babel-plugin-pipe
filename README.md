### babel-plugin-pipeline

一款协助处理对象解构过程中的 null 的 babel 插件

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

2. 同其它正常的 babel 插件一样开启使用，例如：可以在 `.babelrc` 文件的 `plugins` 使用

3. 文件顶部增加 `@pipe` 的注释，插件会自动对文件内的对象解构进行转换，对于需要使用原生用法的现象，可以通过增加 `@pipe-next-line-disabled` 或者 `@pipe-next-line-disabled` 注释来关闭该插件的转换

```js
// @pipe
const { a1 } = test;
// @pipe-next-line-disabled
const { a2: b2 } = test;
const { a4: b4 = 'xxx' } = test; // @pipe-line-disabled
```

#### NOTICE

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