"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functor_maybe_1 = require("../Ch05/functor_maybe");
const trace_1 = require("../common/trace");
const immutability_1 = require("./immutability");
const prisms = (propName) => ({
    get: (object) => functor_maybe_1.Maybe.of(object[propName]),
    set: (value, object) => (Object.assign({}, object, { [propName]: value }))
});
//a.b.c
const composePrisms = (ab, bc) => ({
    get: (a) => ab.get(a).flatmap(b => bc.get(b)),
    set: (c, a) => ab.get(a).map(b => ab.set(bc.set(c, b), a)).orElse(a)
});
const a1 = immutability_1.company.address;
prisms("city").get(a1).ifPresent(x => x.length);
prisms("city").set("12", a1);
const _addressStreet = prisms("street");
const _streetName = prisms("name");
const a2 = {
    city: "shanghai",
    street: {
        name: "huatuo",
        num: 1
    }
};
trace_1.trace(composePrisms(_addressStreet, _streetName).get(a2));
trace_1.trace(composePrisms(_addressStreet, _streetName).set("guoding", a2));
