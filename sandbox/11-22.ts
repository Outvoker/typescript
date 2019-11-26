import { reduce, curry, prop, compose, toUpper, length,split } from 'ramda'
import { sequentially } from 'baconjs';
function* fib(){
    let [x,y] = [1,1]
    while(true){
        yield x;
        [x,y] = [y,x+y]
    }
}

console.log(fib().next())

const sequenceOf = <T>(f:(v:T) => T, v0:T) => {
    return function* fib(){
        let cur = v0
        while(true){
            yield cur;
            cur = f(cur)
        }
    }
}
//斐波那契
const fib_core = (pair:[number,number]) :[number,number] => [pair[1],pair[0]+pair[1]]
const fib1 = sequenceOf(fib_core,[1,1])
//牛顿莱布尼茨
const nr_core = (n:number,x:number) => (x+n/x)/2
const nr = (n:number) => sequenceOf(curry(nr_core)(n),n/2)
//    .pickRelative((v1,v2)=>Math.abs(v2-v1)<0.0000000000000001)

class Lens<S,T>{
    constructor(
        readonly get: (s:S) => T,
        readonly set: (t:T,s:S) => S
    ){}
}

// const lens = <S,T extends keyof S>(properName:T)=>{
//     return new Lens<S,S[T]>{
//         (s:S):S[T] => s[properName],
//         (t:S[T],s:S) => ({
//             ...s,
//             [properName]:t
//         })
//     }
// }