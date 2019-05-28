// @pipe
const [ a = 'xxx', [ c, [ d  = 'ddd' ] ], ...e ] = test;
const [ [ a1, [ b1 ] ] = c1 ] = test || [];