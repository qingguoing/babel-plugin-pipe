// @pipe
function format(a) {
  return a.toUpperCase();
}
const obj = { b: 'bbb', c: { d: 'ccc' } };
const { a = 'xxx', b = 'www', c: c1 = 'zzz', ...d } = obj;
