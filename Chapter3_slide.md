class: middle, center
<style>
  p { font-size: 150% } 
  li { font-size: 150% } 
  .remark-code {  font-size: 120% }
  .small { font-size: 70% }
</style>


# Curry and Function Composition

---

# Why do we curry? 

Curried functions are particularly useful in the context of function **composition**.

In algebra, given two functions, f and g:

.center[**f : b → c, g : a → b**]

---

# Why do we curry? 

You can compose those functions together to create a new function, h from a directly to c:

.center[**h : a → c**]
<br>
.center[**h(x) = f(g(x))**]
<br>
.center[**h : f ◦ g**]

---

# Composition

In typescript
**h(x) = f(g(x))**
--

```typescript
const g =( n :number)=> n + 1
const f =( n :number)=> n * 10

const h = (n:number) => f(g(n))
```

---

# Composition

这种组合方式并没有限制只需要一个参数，或者说，这种组合方式需要自己来处理参数。

如何能够让函数的组合仅仅包含函数？
**h : f ◦ g**

--

```typescript
const h = compose(f,g)
```

---


# What is point-free style

Point-free style is a style of programming where function definitions do not make reference to the function’s arguments.

```typescript
const resultEquals20 = 
    filter(
        compose(
            equals(20),
            prop("result")
        )
    )
```

---

# What is a curried function

A curried function is a function that takes multiple arguments one at a time.
--

###Given a function with 3 parameters:

normal style
 ```typescript
 const add = (x:number,y:number) => x + y;
 ```
--

curried style:
```typescript
const add = (x:number) => (y:number) => x + y
//adds 1 to a number
const inc = add(1)
```

---

# What is a partial application
A partial application is a function which has been applied to some, but not yet all of its arguments.

Partial applications can take as many or as few arguments a time as desired. 

Curried functions on the other hand always return a unary function: a function which takes one argument.

---

# Use function curry to curry a function
Is it possible to reuse existing multi-parameters function?
--

```typescript
const add = (x:number,y:number) => x + y;
const inc = curry(add)(1)
```

---

# Trace function
How to trace the value between each step during the composition?

```typescript
const traceWithLabel = <T>(label:string, value : T)=>{
    console.log(`${label}:${value}`);
    return value;
    
}
const trace  = curry(traceWithLabel)
```

---

# Implementation of function curry

--

```typescript
type Fn<T1, T2, T3> = (n1: T1, n2: T2) => T3;
type CurriedFn<T1, T2, T3> = (n1: T1) => (n2: T2) => T3

const curry = <T1, T2, T3>(fn: Fn<T1, T2, T3>): 
    CurriedFn<T1, T2, T3> => {
    return (n1: T1) => (n2: T2) => fn(n1, n2)
}

```

---

# Implementation of function compose 
--

with type information:
```typescript
const compose = <T1,T2,T3>(f:(v:T2)=>T3,g:(v:T1)=>T2) => 
    (v:T1)=>f(g(v))

```

--

without type information:
```typescript
const compose = (f,g) => (v)=>f(g(v))
```

---

# Composition in other direction : pipe
While compose combines functions from right-to-left, function pipe build a pipe flowing left-to-right, calling each function with the output of the last one.

```typescript
const h = compose(f,g)
const i = pipe(g,f)
```
---

# exercise
Implement a type pipe function that combine two functions.

```typescript
const g =( n :number)=> n + 1
const f =( n :number)=> n * 10

const i = pipe(g,f)
console.log(i(10));//output 110

```