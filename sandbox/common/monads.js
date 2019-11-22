"use strict";
exports.__esModule = true;
//f1: b -> Mc , f2: a -> Mb  compose(f2,f1): a -> Mc
function m_compose(f1, f2) {
    return function (a) { return f2(a).flatmap(function (x) { return f1(x); }); };
}
exports.m_compose = m_compose;
function m_compose3(f1, f2, f3) {
    return function (a) { return f3(a).flatmap(function (b) { return f2(b).flatmap(function (c) { return f1(c); }); }); };
}
exports.m_compose3 = m_compose3;
exports.promiseOf = function (v) {
    if (v)
        return Promise.resolve(v);
    else
        return Promise.reject("null/undefined value accepted");
};
