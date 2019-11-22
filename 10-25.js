"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var MyReduce = function (f, identity, list) {
    var acc = identity;
    for (var i = 0; i < list.length; i++) {
        acc = f(list[i], acc);
    }
    return acc;
};
// const MyFilter = <T>(pred:(v:T)=>boolean, list:T[]):T[]=>
//     MyReduce( (cur:T, acc:T[])=>pred(cur)?[...acc,cur]:acc ,[],list)
//(a->bool)->[a]->[a]
var MyFilter = function (f, values) {
    var fn = function (v, acc) { return f(v) ? __spreadArrays(acc, [v]) : acc; };
    MyReduce(fn, [], values);
};
console.log(MyFilter(function (x) { return x >= 2; }, [1, 2, 3, 4]));
var MyMap = function (fn, values) {
    return MyReduce(function (a, acc) { return __spreadArrays(acc, [fn(a)]); }, [], values);
};
console.log(MyMap(function (x) { return '_' + x + '_'; }, [1, 2, 3, 4]));
//[word]->[sorted word]->[sum of word]->[sum of word with worth]->total
exports.indexOfChar = function (x) {
    return x.charCodeAt(0) - 'A'.charCodeAt(0);
};
var add = function (x) { return function (y) { return x + y; }; };
var sumOfWordIndex = function (word) {
    return word.split("").map(exports.indexOfChar).reduce(add, 0);
};
var sumOfWordsWorth = function (words) {
    return words.sort().map(sumOfWordIndex).map(function (x, i) { return x * (i + 1); }).reduce(add, 0);
};
console.log(sumOfWordsWorth(["AC", "BB"]));
