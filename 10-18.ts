// import  from 'redux'
// import $ from 'ramda'
// const g = (n:number) => n + 1
// const f = (n:number) => n * 20

// const h =  compose(f,g)
const add = (x:number) => (y:number) => x + y
// console.log(add(1)(2))

const traceWithLabel = (label:string, value:any) => {
    console.log(`${label}:${value}`)
    return value
}
// const trace = curry(traceWithLabel)
//curry
type Fn<T1, T2, T3> = (n1: T1, n2: T2) => T3
type curriedType<T1, T2, T3> = (n1: T1) => (n2: T2) => T3

const myCurry = <T1, T2, T3>(fn: Fn<T1, T2, T3>) : curriedType<T1, T2, T3> => {
    return (n1: T1) => (n2: T2) => fn(n1, n2)
}

//compose
const myCompose = <T1, T2, T3>(f: (n: T2) => T3, g: (n: T1) => T2) : (n: T1) => T3 => {
    return (n :T1) => f(g(n))
}

// pipe
const mypipe = <T1, T2, T3>(f: (n: T1) => T2, g: (n: T2) => T3) : (n: T1) => T3 => {
    return (n :T1) => g(f(n))
}
// const mypipe = (f,g) => (v)=>g(f(v))
const g =( n :number)=> n + 1
const f =( n :number)=> n * 10
const i = mypipe(g,f)
console.log(i(10));//output 110


//reduce
// type FuncType<T> = (n:T, s:T) => T
// const MyReduce = <T>(fn: FuncType<T>, initValue:T, list:T[]) : T =>{

// }

//filter
