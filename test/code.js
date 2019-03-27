// @pipe
const { a1 } = test;
// @pipe-next-line-disabled
const { a2: b2 } = test;
const { a3 = 'xxx' } = test;
const { a4: b4 = 'xxx' } = test; // @pipe-line-disabled
// const { a: { b: { c } } } = test;
// const { a: { b = 'xxx' } } = test;
// const { a: { b } = c } = test;
// const { a: { b } = {} } = test;
// let { a = 'b', b = 'c' } = _test;
// const { a: { b } = c } = test;
// const test = {};
// const { c = 'xxx', ...b } = test;
const { a5 = 'xxx' | 'aaa' | 'bbb' | 'ccc' | 'ddd' | 'eee', ...d5 } = test;
const { a: { b: { c : d = 'default' | 'fn1 p1' | 'fn2 p2' | 'fn3', },  }, ...rest } = test;