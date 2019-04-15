// @pipe
const filterNull = (a, b) => {return b};
const test = {};
const { a : { b = [] |> (_ => filterNull(_, [])) } } = test;
console.log(b);
