// @pipe
const { a1 } = test;
// @pipe-next-line-disabled
const { a2: b2 } = test;
const { a3 = 'xxx' } = test;
const { a4: b4 = 'xxx' } = test; // @pipe-line-disabled
const { a5: { b5: { c5 } } } = test;
const { a6: { b6 = 'xxx' } } = test;
// const { a7: { b7 } = c7 } = test;
// const { a8: { b8 } = {} } = test;
let { a9 = 'b', b9 = 'c' } = _test;
// const { a10: { b10 } = c10 } = test;
const { c11 = 'xxx', ...b11 } = test;
const { a12 = 'xxx' | 'aaa' | 'bbb' | 'ccc' | 'ddd' | 'eee', ...d12 } = test;
const { a13 = 'default' | 'fn1 p1' | 'fn2 p2' | 'fn3', ...rest13 } = test;

class UnshareList {
  a() {
    const {
      getMin = 'xxx' | 'aaa' | 'bbb' | 'ccc' | 'ddd'
    } = this;
  }
}