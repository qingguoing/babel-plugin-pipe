### babel-plugin-pipeline

一款协助处理对象解构过程中的 null 的 babel 插件

1. 自动加上兜底空对象

```js
// before
const { a } = test;
```

```js
// after
const { a } = test || {};
```

2. 类 pipe 的多 function 串联调用

```js
// before
const { a: { b: { c : d = 'default' | 'fn1 p1' | 'fn2 p2' | 'fn3', },  }, ...rest } = test;
```

> ps: fn1、fn2、fn3 函数已经声明

```js
// after
const {
  a,
  ...rest
} = test || {},
{
  b
} = a || {},
{
  c: _d = 'default'
} = b || {},
_d3 = fn1(_d, "p1"),
_d2 = fn2(_d3, "p2"),
d = fn3(_d2);
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
const { a: { b: { c : d = 'default' | 'fn1 p1' | 'fn2 p2' | 'fn3', },  }, ...rest } = test;
```

### TODO

[ ] xx