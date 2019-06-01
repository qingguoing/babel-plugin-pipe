// @pipe
const obj = { b: 'bbb', c: { d: 'ccc' } };
const { a = 'xxx', b, c: c1 = 'zzz', ...d } = obj;