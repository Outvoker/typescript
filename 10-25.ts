type FuncType<S,T> = (cur:S,acc:T) => T

const MyReduce = <S,T>(f : FuncType<S,T>, identity:T, list : S[] ) => {
    var acc = identity;
    for (let i = 0; i < list.length; i++) {
        acc = f(list[i],acc)
    }
    return acc;
}
// const MyFilter = <T>(pred:(v:T)=>boolean, list:T[]):T[]=>
//     MyReduce( (cur:T, acc:T[])=>pred(cur)?[...acc,cur]:acc ,[],list)
//(a->bool)->[a]->[a]
const MyFilter = <A>(f:(a:A)=>boolean,values:A[])=>{
    const fn = (v:A,acc:A[])=>f(v)?[...acc,v]:acc
    MyReduce(fn,[],values)
}
console.log(MyFilter(x=>x>=2,[1,2,3,4]))
const forAll = <T>(fn:(v:T)=>boolean, list:T[]) =>{
    return MyReduce( (cur:T, acc:boolean)=>fn(cur)&&acc,true,list)
}

console.log(forAll(x=>x>=2,[1,2,3,4]))


const MyMap =<A,B>(fn:(a:A)=>B,values:A[])=>
    MyReduce((a:A,acc:B[])=>[...acc,fn(a)],[],values)

console.log(MyMap(x=>'_'+x+'_',[1,2,3,4]))

//[word]->[sorted word]->[sum of word]->[sum of word with worth]->total
export const indexOfChar = (x:string)=>
    x.charCodeAt(0)-'A'.charCodeAt(0)
const add = x => y => x+y
const sumOfWordIndex = (word:string):number =>
    word.split("").map(indexOfChar).reduce(add,0)

const sumOfWordsWorth = (words:string[])=>
    words.sort().map(sumOfWordIndex).map((x,i)=>x*(i+1)).reduce(add,0)
    

console.log(sumOfWordsWorth(["AC"]))




class Counter{
    constructor(){
        this.count = 0;
    }
    count : number

    inc(){
        this.count =  this.count + 1;
    }

    dec(){
        this.count = this.count - 1;
    }
}

const counter = new Counter();

counter.inc();
counter.dec();

const conterReducer = 
    (state:{count:number}={count:0},action:Action<"inc"|"dec">):{count:number}=>{
        switch(action.type){
            case "inc": return {count:state.count+1}
            case "dec": return {count:state.count-1}
            default: return state;
        }
    }

const store = createStore(conterReducer)

store.dispatch({type:"inc"})
store.dispatch({type:"dec"})


