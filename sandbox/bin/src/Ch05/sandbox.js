"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
require("../common/trace");
const monads_1 = require("../common/monads");
const trace_1 = require("../common/trace");
//Functor => Monad
class Writer {
    constructor(log, value) {
        this.log = log;
        this.value = value;
    }
    static of(log, value) {
        return new Writer(log, value);
    }
    map(f) {
        return Writer.of("map", f(this.value));
    }
    flatmap(f) {
        const result = f(this.value);
        return Writer.of([this.log, result.log].join(), result.value);
    }
}
const m_toUpper = (v) => {
    return Writer.of("m_toUpper", v.toUpperCase());
};
const m_concat = ramda_1.curry((v1, v2) => {
    return Writer.of("m_concat", v1.concat(v2));
});
const m_length = (v) => {
    return Writer.of("m_length", v.length);
};
trace_1.trace(m_toUpper("test")
    .flatmap(x => m_concat('case ', x))
    .flatmap(x => m_length(x)));
trace_1.trace("test"
    .toUpperCase()
    .concat('case ')
    .length);
trace_1.trace(monads_1.m_compose3(m_length, m_concat('case '), m_toUpper)("test"));
trace_1.trace(ramda_1.pipe(ramda_1.toUpper, ramda_1.concat('case '), x => x.length)("test"));
