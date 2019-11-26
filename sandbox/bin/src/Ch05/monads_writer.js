"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const monads_1 = require("../common/monads");
require("../common/trace");
"test".toUpperCase().concat(' case').length.trace('chain');
ramda_1.pipe(ramda_1.toUpper, ramda_1.concat(' case'), x => x.length)('test').trace('compose');
class Writer {
    constructor(log, value) {
        this.log = log;
        this.value = value;
    }
    static of(log, value) {
        return new Writer(log, value);
    }
    flatmap(f) {
        const targetResult = f(this.value);
        return Writer.of([this.log, targetResult.log].join(), targetResult.value);
    }
    map(f) {
        return Writer.of('map', f(this.value));
    }
}
const toWriter = (label, f) => {
    return (s) => Writer.of(label, f(s));
};
const mToUpper = toWriter('m_ToUpper', (x) => x.toUpperCase());
const mConcat = ramda_1.curry((v1, v2) => {
    return Writer.of('mConcat', v1.concat(v2));
});
const mLength = (v) => {
    return Writer.of('mLength', v.length);
};
mToUpper('test')
    .flatmap(mConcat('case'))
    .flatmap(mLength)
    .trace('mToUpper_mConcat');
monads_1.m_compose3(mLength, mConcat('case '), mToUpper)('test').trace('m_composed');
"test".toUpperCase().concat('case').length.trace('chained');
ramda_1.pipe(ramda_1.toUpper, ramda_1.concat(' case'), x => x.length)('test').trace('composed');
