"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const add = (n1, n2) => {
    console.log('evaluated');
    return n1 + n2;
};
const memorize1 = (func) => {
    let cache = {};
    return (v) => {
        const cached = cache[v];
        return cached ? cached : cache[v] = func(v);
    };
};
const inc = memorize1(ramda_1.curry(add)(1));
exports.memorize = (fn) => {
    let cache = {};
    //@ts-ignore
    return (...v) => {
        const cached = cache[String(v)];
        return cached ? cached : (cache[String(v)] = fn(...v));
    };
};
const factorial = exports.memorize((n) => n === 1 ? 1 : n * factorial(n - 1));
factorial(9);
factorial(10);
factorial(4);
