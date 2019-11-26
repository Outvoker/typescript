"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trace_1 = require("../common/trace");
const immutability_1 = require("./immutability");
// const memorize = <T extends (...params:any[])=>any>(f:T):T =>{
//     let cache:any = {}
//     //@ts-ignore
//     return (...param:Parameters<T>)=>{
//         const cached = cache[String(param)]
//         return cached?cached:(cache[String(param)] = f(...param))
//     }
// }
// const add  = memorize((n1:number,n2:number) => trace(n1 + n2));
// const inc = memorize((n1:number) => trace(n1) + 1)
// //n!
// const factorial = memorize(
//     (n:number):number => n===1 ? 1 : factorial(n-1) * n
// )
// trace_t("result",()=>factorial(99))
// trace_t("result",()=>factorial(100))
// trace_t("result",()=>factorial(3))
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
// const addressCityL = new Lens<Address,string>(
//     (s: Address):string => s.city,
//     ( t: string,s: Address) => ({
//         ...s,
//         city:t
//     })
// )
const lens = (propName) => {
    return new Lens((s) => s[propName], (t, s) => (Object.assign({}, s, { [propName]: t })));
};
const companyAddressL = lens("address");
const companyNameL = lens("name");
const addressCityL = lens("city");
const addressStreetL = lens("street");
const streetNameL = lens("name");
//Address.city =''
trace_1.trace(addressCityL.set('new city', immutability_1.company.address));
trace_1.trace(addressCityL.get(immutability_1.company.address));
// company.address.city = "new city"
trace_1.trace(companyAddressL
    .compose(addressStreetL)
    .compose(streetNameL)
    .set('new name', immutability_1.company));
trace_1.trace(immutability_1.company);
