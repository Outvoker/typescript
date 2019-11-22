import {reduce, compose,curry,toUpper,split, toLower,prop,length, pipe, concat} from 'ramda'
import { Monad, m_compose3,m_compose } from '../common/monads';
import  '../common/trace';

"test".toUpperCase().concat(' case').length.trace('chain')

pipe(toUpper,concat(' case'),x=>x.length)('test').trace('compose')

class Writer<T>{
    constructor(readonly log : string,readonly value : T){}

    static of<T>(log:string,value:T){
        return new Writer<T>(log,value);
    }

    flatmap<F>(f:(v:T)=>Writer<F>):Writer<F>{
        const targetResult = f(this.value)
        return Writer.of([this.log,targetResult.log].join(),targetResult.value)
    }
    map<F>(f:(v:T)=>F):Writer<F>{
        return Writer.of('map',f(this.value))
    }
}

const mToUpper = (v:string):Writer<string>=>{
    return Writer.of('mToUpper',v.toUpperCase() )
}

const mConcat = curry((v1:string,v2:string)=>{
    return Writer.of('mConcat',v1.concat(v2) )
})

const mLength = (v:string)=>{
    return Writer.of('mLength',v.length )
}


mToUpper('test').flatmap(mConcat('case')).flatmap(mLength).trace('mToUpper_mConcat')
m_compose3(mLength,mConcat('case '),mToUpper)('test').trace('m_composed')

"test".toUpperCase().concat('case').length.trace('chained')
pipe(toUpper,concat(' case'),x=>x.length)('test').trace('composed')



