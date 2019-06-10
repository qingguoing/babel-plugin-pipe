// @pipe
function filterA(a) {
  return a.toUpperCase();
}

function filterB(b) {
  return b.charAt(0).toLowerCase() + b.substring(1).toUpperCase();
}

function filterC(c) {
  return `${c}!${c}!`;
}

const test = 'hello world';
const obj = { b: 'bbb', c: 'ccc', e: 'eee', f: 'fff', d: { g: 'ggg' }, h: { i: 'iii' } };
const {
  a = 'xxx' |> filterA |> filterB |> filterC,
  b = '' |> filterC |> filterB,
  d: {
    g = test |> filterC,
    h = test |> filterB |> filterC
  },
  c: c1 = 'zzz' |> filterA,
  ...e
} = obj;
const arr = ['arr xxx', [ 'hello', 'world' ], 'arr yyy', 'arr zzz', 'arr www', [ 'name' ] ];
const [
  x = '' |> filterA |> filterB |> filterC ,
  [
    y = '' |> filterA |> filterC,
    z = '' |> filterB |> filterC,
  ],
  w = '' |> filterA,
  ...restArr
] = arr;
