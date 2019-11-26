"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = Object.getPrototypeOf(function* () { });
Generator.prototype.map = function* (mapper) {
    for (const val of this) {
        yield mapper(val);
    }
};
Generator.prototype.filter = function* (pred) {
    for (const val of this) {
        if (pred(val))
            yield val;
    }
};
Generator.prototype.collect = function () {
    var result = [];
    for (const val of this) {
        result.push(val);
    }
    return result;
};
Generator.prototype.collectFor = function (forPred) {
    var result = [];
    var index = 0;
    for (const val of this) {
        if (!forPred(val, index++))
            break;
        result.push(val);
    }
    return result;
};
Generator.prototype.take = function (n) {
    var result = [];
    var index = 0;
    for (const val of this) {
        if (index++ >= n)
            break;
        result.push(val);
    }
    return result;
};
Generator.prototype.pick = function (pickPred) {
    var index = 0;
    for (const val of this) {
        if (pickPred(val, index++))
            return val;
    }
    return null;
};
Generator.prototype.first = function () {
    for (const val of this) {
        return val;
    }
    return null;
};
Generator.prototype.pickRelative = function (pickPred) {
    let [x, y] = [this.next().value, this.next().value];
    while (true) {
        if (pickPred(x, y))
            return y;
        else
            [x, y] = [y, this.next().value];
    }
};
exports.sequenceOf = (f, init) => {
    return (function* () {
        let cur = init;
        while (true) {
            yield cur;
            cur = f(cur);
        }
    })();
};
function* foreverFrom(start) {
    var cur = start;
    while (true) {
        yield cur++;
    }
}
exports.foreverFrom = foreverFrom;
function* forever() {
    var cur = 0;
    while (true) {
        yield cur++;
    }
}
exports.forever = forever;
function* pairs(x, y) {
    for (let a = x[0]; a <= x[1]; a++) {
        let yrange = y(a);
        for (let b = yrange[0]; b <= yrange[1]; b++)
            yield { x: a, y: b };
    }
}
exports.pairs = pairs;
