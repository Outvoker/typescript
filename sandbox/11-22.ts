import { reduce, curry, prop, compose, toUpper, length,split, filter } from 'ramda'
function* fib(){
    let [x,y] = [1,1]
    while(true){
        yield x;
        [x,y] = [y,x+y]
    }
}

console.log(fib().next())