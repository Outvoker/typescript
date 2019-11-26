import {reduce, compose,curry,toUpper,split, toLower,prop, pipe,concat} from 'ramda'
import  '../common/trace';
import { Monad, m_compose3,m_compose } from '../common/monads';
import { trace } from '../common/trace';

//Functor => Monad
class Writer<T> implements Monad<T>{
    constructor(readonly log : string,readonly value : T){}
    static of<T>(log:string,value:T){
        return new Writer(log,value)
    }
    map<F>(f:(v:T)=>F):Writer<F>{
        return Writer.of("map",f(this.value))
    }
    flatmap<F>(f:(v:T)=>Writer<F>):Writer<F>{
        const result = f(this.value)
        return Writer.of(
            [this.log,result.log].join(),
            result.value)
    }

}

const m_toUpper = (v:string):Writer<string>=>{
    return Writer.of("m_toUpper",v.toUpperCase())
}

const m_concat = curry((v1:string,v2:string):Writer<string>=>{
    return Writer.of("m_concat",v1.concat(v2))
})
const m_length = (v:string):Writer<number> =>{
    return Writer.of("m_length",v.length)
}


trace(m_toUpper("test")
    .flatmap(x=>m_concat('case ',x))
    .flatmap(x=>m_length(x)))
trace("test"
    .toUpperCase()
    .concat('case ')
    .length)
    
trace(m_compose3(m_length,m_concat('case '),m_toUpper)("test"))
trace(pipe(toUpper,concat('case '),x=>x.length)("test"))