import { Maybe } from "../Ch05/functor_maybe"
import { trace } from "../common/trace"
import { Address, Street, company } from "./immutability"

type Prisms<S,T> = {
    get(object:S):Maybe<T>;
    set(value:T,object:S):S
}

const prisms = <S,T extends keyof S>(propName: T):Prisms<S,S[T]> => ({
    get: (object: S):Maybe<S[T]>=> Maybe.of(object[propName]),
    set: (value: S[T],object: S) => ({ ...object, [propName]: value })
})


//a.b.c
const composePrisms = <A,B,C>(ab : Prisms<A,B>, bc : Prisms<B,C>) : Prisms<A,C> =>({
    get: (a :A) : Maybe<C> =>
        ab.get(a).flatmap(b=>bc.get(b))
    ,
    set: (c: C,a: A) : A=> 
        ab.get(a).map(b=>ab.set(bc.set(c,b),a)).orElse(a)
    
})
const a1 = company.address
prisms<Address,"city">("city").get(a1).ifPresent(x=>x.length)
prisms<Address,"city">("city").set("12",a1)


const _addressStreet =prisms<Address,"street">("street")
const _streetName = prisms<Street,"name">("name")
const a2 : Address = {
    city:"shanghai",
    street:{
        name:"huatuo",
        num:1
    }    
}
trace(composePrisms(_addressStreet,_streetName).get(a2))
trace(composePrisms(_addressStreet,_streetName).set("guoding",a2))
