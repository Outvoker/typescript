import {memoizeWith,identity, curry,range,reduce} from 'ramda'
import { trace } from '../common/trace';

const add = (n1:number,n2:number)=>{ 
    console.log('evaluated')
    return n1 + n2;
}


const memorize1 = <V,F>(func:(v:V)=>F):(v:V)=>F=>{
    let cache : any = {}
    return (v:V)=>{
        const cached = cache[v]
        return cached?cached:cache[v]=func(v)
    }
}

const inc = memorize1(curry(add)(1))

export const memorize = <T extends (...args: readonly any[]) => any>( fn: T):T=>{
    let cache :any = {}
    //@ts-ignore
    return (...v: Parameters<T>):any=>{
        const cached = cache[String(v)]
        return cached ? cached : (cache[String(v)] = fn(...v))
    }    
}

const factorial = memorize(
    (n:number):number => n===1 ? 1 : n * factorial(n-1)
)
factorial(9)
factorial(10)
factorial(4)





