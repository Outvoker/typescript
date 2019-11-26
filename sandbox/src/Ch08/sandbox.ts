
import {Subject,from,Observable, range, fromEvent,interval, merge} from 'rxjs'
import * as RxOP from 'rxjs/operators'
import { curry } from 'ramda';
interface Listener{
    <T>(v:T):void
}

class Person{
    private listeners:Listener[] = []
    constructor(private name : string){}

    static of(name:string):Person{
        return new Person(name)
    }

    addListener(listener:Listener):Person{
        this.listeners.push(listener)
        return this;
    }
    updateName (newName :string):Person{
        this.listeners.forEach(listener=>listener(this));
        this.name = newName;
        return this;
    }
    getName(){
        return this.name;
    }
}

const p = Person.of("tom")
            .addListener(x=>console.log(x))
            .updateName("TOM")
console.log(p)

// const observable = from([1,2,3])
// observable.subscribe(v=>console.log(v))

// // const map = new Map();
// // map.set('k1',"first")
// // map.set('k2',"second")
// // from(map).subscribe(x=>console.log(x[0]))
// // map.set('k3',"third")


// const source = new Observable(subscriber=>{
//     subscriber.next(1)
//     subscriber.next(2)
//     subscriber.next(3)
//     setTimeout(() => {
//         subscriber.next(4)
//         subscriber.complete();
//     }, 1000);
// })
// console.log('just after subscribe');
// source.subscribe({
//     next(x){console.log(x);
//     }
// })

// range(1,10).subscribe(x=>console.log(x));

// [1,2,3]
//   .filter(x=>x%2!==0)
//   .map(x=>x*x)
//   .forEach(x=>console.log(x))

// from([1,2,3])
//   .pipe(RxOP.filter(x=>x%2!==0))
//   .pipe(RxOP.map(x=>x*x))
//   .subscribe(x=>console.log(x))

// from(["1","2","3"])
//     .pipe(RxOP.delay(1000),RxOP.timeInterval())
//     .pipe(RxOP.concat("4"))
//     .subscribe(x=>console.log(x))

// const source1 = interval(1000)
//     .pipe(RxOP.map((x:number)=>`Source1 ${x}`),RxOP.take(3))

// const source2 = interval(2000)
//     .pipe(RxOP.map((x:number)=>`Source2 ${x}`),RxOP.take(3))

// merge(source1,source2)
//     .subscribe(console.log)

const sub = new Subject();

sub.next(1);
sub.subscribe(console.log);
sub.next(2); // OUTPUT => 2
sub.subscribe(console.log);
sub.next(3); // OUTPUT => 3,3 (logged from both subscribers)
    
