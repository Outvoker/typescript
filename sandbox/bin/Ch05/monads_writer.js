"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var monads_1 = require("../common/monads");
require("../common/trace");
"test".toUpperCase().concat(' case').length.trace('chain');
ramda_1.pipe(ramda_1.toUpper, ramda_1.concat(' case'), function (x) { return x.length; })('test').trace('compose');
var Writer = /** @class */ (function () {
    function Writer(log, value) {
        this.log = log;
        this.value = value;
    }
    Writer.of = function (log, value) {
        return new Writer(log, value);
    };
    Writer.prototype.flatmap = function (f) {
        var targetResult = f(this.value);
        return Writer.of([this.log, targetResult.log].join(), targetResult.value);
    };
    Writer.prototype.map = function (f) {
        return Writer.of('map', f(this.value));
    };
    return Writer;
}());
var mToUpper = function (v) {
    return Writer.of('mToUpper', v.toUpperCase());
};
var mConcat = ramda_1.curry(function (v1, v2) {
    return Writer.of('mConcat', v1.concat(v2));
});
var mLength = function (v) {
    return Writer.of('mLength', v.length);
};
mToUpper('test').flatmap(mConcat('case')).flatmap(mLength).trace('mToUpper_mConcat');
monads_1.m_compose3(mLength, mConcat('case '), mToUpper)('test').trace('m_composed');
"test".toUpperCase().concat('case').length.trace('chained');
ramda_1.pipe(ramda_1.toUpper, ramda_1.concat(' case'), function (x) { return x.length; })('test').trace('composed');
