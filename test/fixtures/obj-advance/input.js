// @pipe
const { a = 'xxx', b: { c: d = 'yyy' } = f, e: e1 = 'zzz', ...g } = test;
const { a1: { b1: { d1 } } = c1 } = test || {};