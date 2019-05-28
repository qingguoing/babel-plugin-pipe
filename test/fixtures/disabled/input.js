// @pipe
const { a } = test;
// @pipe-next-line-disabled
const { a1: b1 } = test;
const { a2: b2 = 'xxx' } = test; // @pipe-line-disabled
const [ a3 ] = test;
const [ a4 = 'xxx' ] = test; // @pipe-line-disabled
// @pipe-next-line-disabled
const [ a5 ] = test;
