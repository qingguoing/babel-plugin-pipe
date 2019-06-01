// @pipe
const obj = { b: 'bbb', c: 'ccc', e: 'eee', f: 'fff', d: 'ddd' };
const { a = 'xxx', b, c: c1 = 'zzz', ...d } = obj;
const arr = ['arr xxx', 'arr yyy', 'arr zzz', 'arr www'];
const [ xxx, ...restArr ] = arr;