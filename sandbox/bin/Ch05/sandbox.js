"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
require("../common/trace");
var monads_1 = require("../common/monads");
var trace_1 = require("../common/trace");
//Functor => Monad
var Writer = /** @class */ (function () {
    function Writer(log, value) {
        this.log = log;
        this.value = value;
    }
    Writer.of = function (log, value) {
        return new Writer(log, value);
    };
    Writer.prototype.map = function (f) {
        return Writer.of("map", f(this.value));
    };
    Writer.prototype.flatmap = function (f) {
        var result = f(this.value);
        return Writer.of([this.log, result.log].join(), result.value);
    };
    return Writer;
}());
var m_toUpper = function (v) {
    return Writer.of("m_toUpper", v.toUpperCase());
};
var m_concat = ramda_1.curry(function (v1, v2) {
    return Writer.of("m_concat", v1.concat(v2));
});
var m_length = function (v) {
    return Writer.of("m_length", v.length);
};
trace_1.trace(m_toUpper("test")
    .flatmap(function (x) { return m_concat('case ', x); })
    .flatmap(function (x) { return m_length(x); }));
trace_1.trace("test"
    .toUpperCase()
    .concat('case ')
    .length);
trace_1.trace(monads_1.m_compose3(m_length, m_concat('case '), m_toUpper)("test"));
trace_1.trace(ramda_1.pipe(ramda_1.toUpper, ramda_1.concat('case '), function (x) { return x.length; })("test"));
