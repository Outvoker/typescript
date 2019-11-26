"use strict";
exports.__esModule = true;
var perf_hooks_1 = require("perf_hooks");
Object.prototype.trace = function (label) {
    console.log(label + ":" + JSON.stringify(this));
    return this;
};
exports.trace = function (v) {
    console.log(v);
    return v;
};
exports.trace_l = function (label, v) {
    console.log(label + ":" + JSON.stringify(v));
    return v;
};
exports.trace_t = function (label, f) {
    var start = perf_hooks_1.performance.now();
    var result = f();
    var timespan = perf_hooks_1.performance.now() - start;
    console.log(label + ":" + JSON.stringify(result) + " within " + timespan + "ms");
    return result;
};
