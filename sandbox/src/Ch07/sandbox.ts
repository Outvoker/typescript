import { trace, trace_l, trace_t } from "../common/trace"
import { curry } from "ramda"
import { Address, company, Company, Street } from "./immutability"
import { S } from "ts-toolbelt"

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


class Lens<S, T>{
    constructor(
        readonly get: (s: S) => T,
        readonly set: ( t: T,s: S) => S
    ) { }
    compose<U>(tu : Lens<T,U>):Lens<S,U>{
        let st = this;
        return new Lens<S,U>(
            (s: S):U => tu.get(st.get(s)),
            ( u: U,s: S):S => st.set(tu.set(u,st.get(s)),s)
        )
    }
}
// const addressCityL = new Lens<Address,string>(
//     (s: Address):string => s.city,
//     ( t: string,s: Address) => ({
//         ...s,
//         city:t
//     })
// )

const lens = <S,T extends keyof S>( propName : T)=>{
    return new Lens<S,S[T]>(
        (s: S):S[T] => s[propName],
        ( t: S[T],s: S) => ({
            ...s,
            [propName]:t
        })
    )
}

const companyAddressL = lens<Company, 'address'>("address")
const companyNameL = lens<Company, "name">("name")
const addressCityL = lens<Address, "city">("city")
const addressStreetL = lens<Address, "street">("street")
const streetNameL = lens<Street, "name">("name")

//Address.city =''
trace(addressCityL.set('new city',company.address))
trace(addressCityL.get(company.address))
// company.address.city = "new city"

trace(companyAddressL
    .compose(addressStreetL)
    .compose(streetNameL)
    .set('new name',company))
trace(company)


    