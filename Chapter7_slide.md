class: middle,center
<style>
  p { font-size: 150% } 
  li { font-size: 150% } 
  .remark-code {  font-size: 110% }
  .small { font-size: 70% }
</style>

# Memorize
# Laziness
# Immutability
# Lens

---

# Memorize

A memoized function "remembers" the results corresponding to some set of specific inputs.

Memoization is a way to lower a function's time cost in exchange for space cost.

A function can only be memoized if it is referentially transparent

---

# Implement memorize

memorize is a high-order function, it take a function as parameter and return a memorized version of same function.

memorize for single parameter function:
```typescript
const memorize = <V,F>(func:(v:V)=>F):(v:V)=>F=>{
    let cache : any = {}
    return (v:V)=>{
        const cached = cache[v]
        return cached?cached:cache[v]=func(v)
    }
}
```
---

# Implement memorize
memorize for multi parameters function

```typescript
const memorize = <T extends (...args: readonly any[]) => any>( fn: T):T=>{
    let cache :any = {}
    //@ts-ignore
    return (...v: readonly any[]):any=>{
        const cached = cache[String(v)]
        return cached ? cached : (cache[String(v)] = fn(v))
    }    
}
```

---

#Implement memorize

factorial

```typescript
const factorial = memorize(
    (n:number):number => n===1 ? 1 : n * factorial(n-1)
)

```

---

# memorize : Java version

```java
public final class Memoizer {
    public static <I, O> Function<I, O> memoize(Function<I, O> f) {
        ConcurrentMap<I, O> lookup = new ConcurrentMap<>();
        return input -> lookup.computeIfAbsent(input, f);
    }
}
```
---

# memorize : Java version

```java
public class Factorial {
    private static final Function<Long, Long> CACHED = Memoizer.memoize(Factorial::uncached);
 
    public static long factorial(long n) {
        return CACHED.apply(n);
    }
 
    private static long uncached(long n) {
        long result = n;
        long m = n - 1;
        while (m > 1) {
            result = result * m;
            m -= 1;
        }
        return result;
    }
}
```

---

# Laziness
Lazy evaluation is a technique or pattern that delays the evaluation of an expression until its value is needed.

Lazy evaluation makes it practical to modularize a program as a generator that constructs a large number of possible answers, and a selector that chooses the appropriate one.
---

# Laziness
How to generate a fibonacci sequence, and pick first 20 even numbers.

--

```typescript
function* fib(){
    let [x,y] = [1,1]
    while(true){
        yield x;
        [x,y] = [y,x+y]
    }
}
console.log(
    fibonacci().filter(x=>x%2==0).take(20).join(',')

```

---

# Laziness : Newton-Raphson Square Roots
This algorithm computes the square root of a number n by starting from an initial approximation a0 and computing better and better ones using the rule.

a[i+1]= (a[i] + n/[a])/2

It can be model as generating a sequence of numbers and pick one  until it is very close to the previous one.

---

# Lazy 

Step 1: abstract the sequence generator:

--

```typescript
const sequenceOf = <T>(f:(x:T)=>T, init:T) => {
    return (function*(){
        let cur = init
        while(true){
            yield cur
            cur = f(cur)
        }
    })
}
```

---

# Lazy

Step 2: rewrite fibonacci function

--

```typescript
const fib_core = (pair:[number,number]):[number,number] => 
    [pair[1],pair[0]+pair[1]]
const fib1 = sequenceOf(fib_core,[1,1]).map(x=>x[0])
```

---

# Lazy

Step 3: Implement Newton-Raphson Square Roots with sequenceOf

--

```typescript
const nr_core = (n:number,x:number)  => (x + n / x) / 2
const nr = (n:number) => 
    sequenceOf(curry(nr_core)(n),n/2)
        .pickRelative((v1,v2)=>Math.abs(v1-v2)<0.00001)
```

---

# Immutability

In object-oriented and functional programming, an immutable object (unchangeable object) is an object whose state cannot be modified after it is created. This is in contrast to a mutable object (changeable object), which can be modified after it is created.

---

# Immutability Of a object

The easiest way to implement an immutable data structure in TypeScript is to use classes and the **readonly** keyword:


---

# Immutability Of a object
```typescript
class Person {
    public readonly name: string;
    public readonly age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
const person = new Person("Remo", 29);
person.age = 30; // Error
person.name = "Remo Jansen"; // Error
```

---

# Immutability Of a object

for an object with nested structure:

```typescript
class Company {
    readonly name: string
    readonly address: Address
}
class Street {
    readonly num: number
    readonly name: string
}
class Address {
    readonly city: string
    readonly street: Street
}
```

---

# Immutability Of object
For a company object:
```typescript
export const company: Company = {
    name: "Ali",
    address: 
        {
            city: "Hangzhou",
            street: {
                name: "jiefangroad",
                num: 300
            }
        }
}
```
how to change its address to uppercase?
```typescript
 company.address.street.name 
     = company.address.street.name.toLowerCase()
```

---

# Immutability Of a object
We should copy the entire object and touch the related field only
```typescript
const newCompany : Company= {
    ...company,
    address:{
        ...company.address,
        street:{
            ...company.address.street,
            name:company.address.street.name.toUpperCase()
        }
    }
} 
```

---

# Immutability

Dark side of immutable: they can lead to verbose and tedious code.

We have a solution known as lenses

---

# Lenses
A lens is just a pair of functions that allow us to get and set a value in an object. The interface of a lens could be declared as follows:

```typescript
export class Lens<S, T>{
    constructor(
        readonly get: (object: S) => T,
        readonly set: (object: S, value: T) => S
    ) { }
}
```

---

# Lenses
We can define lens for each field of a type
```typescript
const addressCity = new Lens<Address,string>(
    (object:Address)=>object.city,
    (value:string,address:Address)=>({
            ...address,
            city:value
        })
)
```

---

# Lenses
```typescript
//get and set city
addressCity.get(address) //address.city
addressCity.set(
    company.address.city.toUpperCase()
    ,company.address
)
 ////address.city = "new city"
```

---

# Lenses
We can write a function generate lens for each field of a type

```typescript
export const lens = <S, T extends keyof S>(propName: T) => 
    new Lens<S, S[T]>(
        (s) => s[propName],
        (t,s) => 
            ({ ...s, [propName]: t })
    )

```

---

# Lenses

```typescript
const companyAddress = lens<Company, 'address'>("address")
const companyName = lens<Company, "name">("name")
const addressCity = lens<Address, "city">("city")
const addressStreet = lens<Address, "street">("street")
const streetName = lens<Street, "name">("name")

```

---

# Lenses
The great thing about lenses is that they compose

```typescript
companyAddress
    .compose(addressStreet)
    .compose(streetName)
    .set("new street",company)

company
    .address
    .street
    .name = "new street" //compile error:readonly
```

---

# Lenses
Implementation of compose:
```typescript
export class Lens<S, T>{
    ......
    compose<U>(tu : Lens<T,U>):Lens<S,U>{
        const st = this
        return new Lens<S,U>(
            (s: S):U => tu.get(st.get(s)),
            (u: U,s: S):S =>  st.set(tu.set(u,st.get(s)),s)
        )
    }
    ......
}
```

---


# Lenses : Exercises
set mapped values:

```typescript
companyAddress
    .compose(addressStreet)
    .compose(streetName)
    .map(x=>x.toUpperCase(),company)

```

How to implement map function

---

# Lenses
It can be much simpler with proxy technology

from [lens.ts](https://www.npmjs.com/package/lens.ts)

```typescript
const companyL = lens<Company>()
const addressL = lens<Address>()
const streetL = lens<Street>()

companyL.address
    .compose(addressL.street)
    .compose(streetL.name)
    .set(x=>x.toUpperCase())
    (company)
```