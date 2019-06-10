// @pipe
const test = 'hello world';
const obj = { b: 'bbb', c: 'ccc', e: 'eee', f: 'fff', d: { g: 'ggg' }, h: { i: 'iii' } };
const { a = 'xxx', b, c: c1 = 'zzz',
  d: {
    g = test,
    h = test
  },
  u: {
    v: {
      w = 'www',
      w1 = test,
    }
  },
  ...e
} = obj;
const arr1 = [];
const [ [ arrU = 'uuu' ], [ [ [ arrV = 'vvv' ] ] ], [ [ [ [ arrW = test ] ] ] ] ] = arr1;
const arr2 = ['arr xxx', [ 'hello', 'world' ], 'arr yyy', 'arr zzz', 'arr www', [ 'name'] ];
const [ x, [ y, z ], ...restArr ] = arr2;