// import  from 'redux'
// import $ from 'ramda'
// const g = (n:number) => n + 1
// const f = (n:number) => n * 20
// const h =  compose(f,g)
var add = function (x) { return function (y) { return x + y; }; };
// console.log(add(1)(2))
var traceWithLabel = function (label, value) {
    console.log(label + ":" + value);
    return value;
};
var myCurry = function (fn) {
    return function (n1) { return function (n2) { return fn(n1, n2); }; };
};
//compose
var myCompose = function (f, g) {
    return function (n) { return f(g(n)); };
};
// pipe
var mypipe = function (f, g) {
    return function (n) { return g(f(n)); };
};
// const mypipe = (f,g) => (v)=>g(f(v))
var g = function (n) { return n + 1; };
var f = function (n) { return n * 10; };
var i = mypipe(g, f);
console.log(i(10)); //output 110
