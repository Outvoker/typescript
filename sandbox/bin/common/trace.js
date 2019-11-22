"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.prototype.trace = function (label) {
    console.log(label + ":" + JSON.stringify(this));
    return this;
};
exports.trace = function (v) {
    console.log(v);
    return v;
};
