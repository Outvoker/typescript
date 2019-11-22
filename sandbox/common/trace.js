"use strict";
exports.__esModule = true;
Object.prototype.trace = function (label) {
    console.log(label + ":" + JSON.stringify(this));
    return this;
};
exports.trace = function (v) {
    console.log(v);
    return v;
};
