"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./common/generator.extension");
const ramda_1 = require("ramda");
require("./common/trace");
const trace_1 = require("../common/trace");
function* fib() {
    let [x, y] = [1, 1];
    while (true) {
        yield x;
        [x, y] = [y, x + y];
    }
}
fib()
    .filter(x => x % 2 == 0)
    .take(20)
    .trace('fib(20)');
const sequenceOf = (f, init) => {
    return (function* () {
        let cur = init;
        while (true) {
            yield cur;
            cur = f(cur);
        }
    })();
};
const fib_core = (pair) => [pair[1], pair[0] + pair[1]];
const fib1 = sequenceOf(fib_core, [1, 1]).map(x => x[0]);
fib1
    .filter(x => x % 2 == 0)
    .take(20)
    .trace("fib(20)");
const nr_core = (n, x) => (x + n / x) / 2;
const nr = (n) => sequenceOf(ramda_1.curry(nr_core)(n), n / 2)
    .pickRelative((v1, v2) => Math.abs(v1 - v2) < 0.00001);
trace_1.trace(nr(10));
