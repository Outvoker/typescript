import  "../common/generator.extension";
import { curry } from "ramda";
import  '../common/trace'
import { trace } from "../common/trace";
function* fib(){
    let [x,y] = [1,1]
    while(true){
        yield x;
        [x,y] = [y,x+y]
    }
}
fib()
    .filter(x=>x%2==0)
    .take(20)
    .trace('fib(20)')

const sequenceOf = <T>(f:(x:T)=>T, init:T) => {
    return (function*(){
        let cur = init
        while(true){
            yield cur
            cur = f(cur)
        }
    })()
}

const fib_core = (pair:[number,number]):[number,number] => 
    [pair[1],pair[0]+pair[1]]
const fib1 = sequenceOf(fib_core,[1,1]).map(x=>x[0])

fib1
    .filter(x=>x%2==0)
    .take(20)
    .trace("fib(20)")

const nr_core = (n:number,x:number)  => (x + n / x) / 2
const nr = (n:number) => 
    sequenceOf(curry(nr_core)(n),n/2)
        .pickRelative((v1,v2)=>Math.abs(v1-v2)<0.0000001)


trace(nr(16))
