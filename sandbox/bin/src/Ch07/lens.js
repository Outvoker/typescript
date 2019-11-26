"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trace_1 = require("../common/trace");
const immutability_1 = require("./immutability");
class Lens {
    constructor(get, set) {
        this.get = get;
        this.set = set;
    }
    compose(tu) {
        let st = this;
        return new Lens((s) => tu.get(st.get(s)), (u, s) => st.set(tu.set(u, st.get(s)), s));
    }
}
exports.Lens = Lens;
// const addressCityL = new Lens<Address,string>(
//     (s: Address):string => s.city,
//     ( t: string,s: Address) => ({
//         ...s,
//         city:t
//     })
// )
exports.lens = (propName) => {
    return new Lens((s) => s[propName], (t, s) => (Object.assign({}, s, { [propName]: t })));
};
const companyAddressL = exports.lens("address");
const companyNameL = exports.lens("name");
const addressCityL = exports.lens("city");
const addressStreetL = exports.lens("street");
const streetNameL = exports.lens("name");
//Address.city =''
trace_1.trace(addressCityL.set('new city', immutability_1.company.address));
trace_1.trace(addressCityL.get(immutability_1.company.address));
// company.address.city = "new city"
//company.address.street.name = "new name"
trace_1.trace(companyAddressL
    .compose(addressStreetL)
    .compose(streetNameL)
    .set('new name', immutability_1.company));
trace_1.trace(immutability_1.company);
