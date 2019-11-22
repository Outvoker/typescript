
# Functional Programming Fundamentals
- Brief history of functional programming
- The benefits of functional Programming
- Introducing functional programming

---

# Brief history of functional programming

## Rise
Lambda calculus was introduced by the mathematician Alonzo Church in the 1930s.

Lisp was created in 1958, and was heavily influenced by lambda calculus.

---

# Brief history of functional programming
* 1951 – Regional Assembly Language
* 1952 – Autocode
* 1954 – **IPL** (forerunner to LISP)
* 1955 – FLOW-MATIC (led to COBOL)
* 1957 – FORTRAN (first compiler)
* 1957 – COMTRAN (precursor to COBOL)
* 1958 – **LISP**

AutoLisp is used in Autocad

---

# Brief history of functional programming
## Fall

Somewhere between 1970 and 1980, the way that software was composed drifted away from simple algebraic math to procedure(C) and OO language(C++,Java)

>For most of us, creating software was a bit of a nightmare for 30 years. Dark times. 

---Composing Software by Eric Elliott

---

# Brief history of functional programming

## Rise

Around 2010, something great began to happen: JavaScript exploded. 

Before about 2006, JavaScript was widely considered a toy language used to make cute animations happen in web browsers.

It is functional feature such as lambda calculus make it powerful.

<!-- 
https://medium.com/javascript-scene/the-rise-and-fall-and-rise-of-functional-programming-composable-software-c2d91b424c8c
-->

---

# List of functional programming languages

* Lisp
* Clojure
* Erlang
* Haskell
* F#
* Javascript
* Java
* ......


---

# Programming paradigms: imperative
## **Imperative** in which the programmer instructs the machine how to change its state:
* **procedural** which groups instructions into procedures,
* **object-oriented** which groups instructions together with the part of the state they operate on.

---

# Programming paradigms: declarative
**Declarative** in which the programmer merely declares properties of the desired result, but not how to compute it:
* **Functional** in which the desired result is declared as the value of a series of function applications,
* **Logic** in which the desired result is declared as the answer to a question about a system of facts and rules,
* **Mathematical** in which the desired result is declared as the solution of an optimization problem

---

# Introducing functional programming

In a programming paradigm such as OOP, the main building blocks that we use to create an application are objects (objects are declared using classes).  

In FP, we use functions as the main building block in our applications.

<!--
软件开发的一个核心概念是组装，小到搭积木，大到航空母舰，都需要好一个个基本的单元构建起来。也许现在大家很多课程中关注的是算法的技巧，并且现在算法确实可以成为一个企业最重要的核心竞争力，但是，无论是多么具有魔法的算法，都需要应用在一个有组织的复杂的我系统中才能体现其作用，无论是OOP还是FP，都是研究系统是如何被组装起来的。
-->

---

# Introducing functional programming

> **Object-oriented programming** makes code understandable by encapsulating moving parts.
**Functional programming** makes code understandable by minimizing moving parts.

--– Michael Feathers

<!--
In OOP, we use encapsulation to prevent objects from being aware of the state mutations of other objects. In functional programming, we try to avoid dealing with state mutations instead of encapsulating them.

it has no assignment, no side effects, no flow of control)

如何说明函数式中的函数和一般的函数有什么区别

演示步骤：
1. 实现一个针对集合的加法
2. 实现一个针对集合的乘法
3. 看下是否有重复的代码，使用函数式改写
4. 手动实现高阶函数
参考functional_nonfunctional.ts
 -->

---

# The benefits of functional programming

+ Code is simple
+ Code is testable
+ Code is easy to reason about
+ Concurrency
+ Simpler caching

---

# The benefits of functional programming 

>A functional programmer is an order of magnitude more **productive** than its conventional counterpart  ---Why Functional Programming Matters by John Hughes

**DEMO** :functional and nonfunctional

<!---
arrow function的语法
--->

---

# Pure functions

A pure function is a function where the return value is only determined by its input values, without observable side effects.

An impure permits something to happen in a dark corner rather than along the input/output boundaries. 
<!---
在函数式程序设计中的函数与C/Java中的函数是不同的，函数式程序设计中的函数指的是纯函数。
pure.ts
--->
**DEMO**: pure.ts

---

# Pure functions : Same Input, Same Output

```typescript
//impure
var minimum = 21
const checkAgeImpure = (age:number) => {
    return age > minimum
}

//pure
const checkAgePure = (minimum:number,age:number) => {
    return age > minimum
}
```

---

# Pure functions : Same Input, Same Output

```typescript
//impure
Math.random()

const time=()=>newDate().toLocaleTimeString();
time(); //=>"5:15:45PM"
```

---

# Pure functions : No Side Effects
A function is said to have a side effect if it modifies some state variable value(s) outside its local environment, that is to say has an observable effect besides returning a value (the main effect) to the invoker of the operation. 

  ```typescript
 n : number = 0;
 function f(){
     n = 1;
 }
 ```

---

# Pure functions : No Side Effects

```typescript
interface CartItem{
    item : string
    quantity : number
}
//impure
const addToCartImpure = 
    (cart : CartItem[], item:string, quantity:number)=>{
        cart.push({
            item:item,
            quantity:quantity
        })
        return cart;
    }
```

---

# Pure functions : No Side Effects

```typescript
const addToCartPure = 
    (cart : CartItem[], item:string, quantity:number)=>{
        return [
            ...cart,
            {
                item:item,
                quantity:quantity
            }
        ]
}

```
---

# Pure functions : No Side Effects


> It is not that we're forbidden to use them, rather we want to contain them and run them in a controlled way. 

---drboolean. mostly-adequate-guide (old)


---

# Pure functions : Immutability
Immutability refers to the inability to change the value of a variable after a value has been assigned to it.

How to design Immutable class/datatype?

<!--
for simple objects
for containers
-->

---

# Pure functions: Cacheable
pure functions can always be cached by input

---

# Pure functions: Portable / Self-Documenting

Pure functions are completely self contained, a pure function's dependencies are explicit and therefore easier to see and understand - no funny business going on under the hood.

---

# Pure functions: Portable / Self-Documenting 
Impure
```javascript
var signUp = function(attrs) {
  var user = saveUser(attrs);
  welcomeUser(user);
};

var saveUser = function(attrs) {
    var user = Db.save(attrs);
    ...
};

var welcomeUser = function(user) {
    Email(user, ...);
    ...
};
```
---

# Pure functions: Portable / Self-Documenting 
Pure
```javascript
var signUp = function(Db, Email, attrs) {
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};

var saveUser = function(Db, attrs) {
    ...
};

var welcomeUser = function(Email, user) {
    ...
};

```

---

# Pure functions : Testable

Pure functions make testing much easier. We don't have to mock a "real" payment gateway or setup and assert the state of the world after each test. We simply give the function input and assert output.

---

# Pure functions : Reasonable
If the program is expressed in a mathematical form, then each stage of the computation can be described by a formula. Programs can be verified — proved correct — or derived from a specification.

<!---
TODO : Rewriting: https://en.wikipedia.org/wiki/Rewriting
Proof: https://pdfs.semanticscholar.org/54ed/d2d03c6afffa149247e29014f16b30f31aa5.pdf
--->

---

# Pure functions : Parallel Code
we can run any pure function in parallel since it does not need access to shared memory and it cannot, by definition, have a race condition due to some side effect.

**DEMO**: firstclass.js

<!---
//first-class:第一类的
const R = require('ramda')
const {filter,compose,equals,prop} = R

const results  = [
    {id:1,result:10},
    {id:2,result:20},
    {id:3,result:30}
]

console.log(results.filter((value)=>value.result === 20))

const resultEquals20 = filter(compose(equals(20),prop("result")))
console.log(resultEquals20(results))

需要展示：
1. function as firstclass element
2. Pointfree style
3. What is high-order function
--->

---


# Referential transparency

In functional programming, referential transparency is generally defined as the fact that an expression, in a program, may be replaced by its value (or anything having the same value) without changing the result of the program.

<!--
All pure functions are necessarily referentially transparent. 

However, it is possible to have referentially transparent functions which are not pure.
https://stackoverflow.com/questions/4865616/purity-vs-referential-transparency
-->
---

# Stateless versus stateful

**Stateful** means the computer or program keeps track of the state of interaction, usually by setting values in a storage field designated for that purpose. 

**Stateless** means there is no record of previous interactions and each interaction request has to be handled based entirely on information that comes with it.

---

# Stateless versus stateful

The more pieces of your program are stateless, the more ways there are to put pieces together without having anything break. The power of the stateless paradigm lies not in statelessness (or purity), but the ability it gives you to write powerful, reusable functions and combine them.

---

# Declarative versus imperative programming


**Imperative programming** focuses on describing how a program operates.

**Declarative programming** expresses the logic of a computation without describing its control flow.

<!-- 
https://www.oreilly.com/library/view/functional-programming-in/9781492048633/ch01.html

TODO: 如何去掉程序中的控制流
-->

---

# Functions as first-class citizens
A function is a first-class citizen when it can do everything that a variable can do, which means that functions can be passed to other functions as an argument, or return as values from a function.

---

# Higher-order functions
A higher-order function is a function that does at least on of the following:

* Takes one or more functions as arguments
* Returns a function as its result

---

# Pointfree style
Pointfree style means functions that never mention the data upon which they operate. First class functions, currying, and composition all play well together to create this style.

Pointfree code can again, help us remove needless names and keep us concise and generic. For example, Can't compose a while loop, conditional if/else. We can focus on transformation itself.

pointfree is a double-edged sword and can sometimes obfuscate intention

---

# Lambda expressions
Lambda expressions are just expressions that can be used to declare anonymous functions (functions without a name).

---

# Function arity
The arity of a function is the number of arguments that the function takes.
 
A **unary** function is a function that only takes a single argument.Unary functions are very important in functional programming because they facilitate utilization of the function composition pattern.

A **binary** function is a function that takes two arguments.

There are also functions with three (**ternary** functions) or more arguments.

<!-- 
TODO Demo composition using unary function
-->

---

# Laziness
Many functional programming languages feature lazy-evaluated APIs. The idea behind lazy evaluation is that operations are not computed until doing so can no longer be postponed.
 
---

# Composition

The essence of software development is composition.

* Object Composition
* Function composition

---

# Composition : Object

```json
{
    "quiz": {
        "sport": {
            "q1": {
                "question": "Which one is correct team name in NBA?",
                "options": [
                    "New York Bulls",
                    "Huston Rocket"
                ],
                "answer": "Huston Rocket"
            }
        },
        "maths": {
            "q1": {
                //......
            },
        }
    }
```

---

# Composition : Function
- javascript
```javascript
filter(
  compose(
    equals(20),
    prop("result")
  )
)
```
- clojure
```clojure
(def xf
  (comp
    (filter odd?)
    (map inc)
    (take 5)
  )
)
```

---

# Composition : How to make it possible

it is simplicity that make composition possible.

* A horrible example
* The gorilla/banana problem
    
    “...the problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.”<br> Joe Armstrong