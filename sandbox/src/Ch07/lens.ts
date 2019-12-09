import { trace } from "../common/trace"
import { Address, Street, Company, company } from "./immutability"

export class Lens<S, T>{
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

export const lens = <S,T extends keyof S>( propName : T)=>{
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

//company.address.street.name = "new name"
trace(companyAddressL
    .compose(addressStreetL)
    .compose(streetNameL)
    .set('new name',company))
trace(company)

