class: middle,center
<style>
  p { font-size: 150% } 
  li { font-size: 150% } 
  .remark-code {  font-size: 110% }
  .small { font-size: 70% }
</style>


# Functor and Monads

---

# Functor

A functor data type is something you can map over. It's a container which has a map operation which can be used to apply a function to the values inside it.

{Box of a's}--->map(a->b)--->{Box of b's}

---

# Functor in java : Optional

>from https://www.callicoder.com/java-8-optional-tutorial/ by Rajeev Singh 

Optional is a container type for a value which may be absent. 

Consider the following function which takes a user id, fetches the user’s details with the given id from the database and returns it:

```java
User findUserById(String userId) { ... };
```

---

# Functor in java : Optional

If userId is not present in the database then the above function returns null. Now, let’s consider the following code written by a client -
```java
User user = findUserById("667290");
System.out.println("User's Name = " + user.getName());
```

---

# Functor in java : Optional
<!--- 
https://dev.to/joelnet/null-the-billion-dollar-mistake-maybe-just-nothing-1cak
--->

NULL, "The Billion Dollar Mistake", Maybe Just Nothing

>I call it my billion-dollar mistake. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object oriented language (ALGOL W). .....  This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years. -- Tony Hoare, 2009

<!--
 My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement.-->
---

# Functor in java : Optional
And for some reason JavaScript decided to double down on the problems with null by also creating undefined.


8 of 10 errors from Top 10 JavaScript errors from 1000+ projects are null and undefined problems. 
https://rollbar.com/blog/top-10-javascript-errors/


---

# Functor in java : Optional

Rewrite with Optional:

```java
Optional<User> findUserById(String userId) { ... };

Optional<User> optional = findUserById("667290");

optional.ifPresent(user -> {
    System.out.println("User's name = " + user.getName());    
})
```

---

# Functor in java : Optional
Returning default value using orElse()

Without Optional ;
```java
// return "Unknown User" if user is null
User finalUser = (user != null) ? 
    user : new User("0", "Unknown User");
```

With Optional
```java
// return "Unknown User" if user is null
User finalUser = optionalUser.orElse(
    new User("0", "Unknown User"));
```

---

# Functor in java : Optional
Considering the following getAddress() method inside User class 
```java
class User{
    ...
    Address getAddress() {
        return this.address;
    }
    ...
}
```

---
# Functor in java : Optional

get the address of a user if it is present and print it if the user is from India.
```java
if(user != null) {
    Address address = user.getAddress();
    if(address != null && address.getCountry().equalsIgnoreCase("India")) {
	    System.out.println("User belongs to India");
    }
}
```

---

# Functor in java : Optional
how we can get the same result using map() method
```java
userOptional.map(User::getAddress)
    .filter(address -> address.getCountry().equalsIgnoreCase("India"))
    .ifPresent(() -> {
        System.out.println("User belongs to India");
    });
```

---


# What is a category

A category is an algebraic structure that models objects and their relationships(arrows) with each other.


---

# What is a category
<image src="./images/c5_functor-1.png" height="70%">

---

# What is a category

A collection of objects and arrows qualifies as a category only if:

* The composition is associative. More formally,
.center[h ∘ (g ∘ f) = (h ∘ g) ∘ f]
for every three arrows, and;
* For every object a there is an identity arrow (i.e. a loop) ia that connects it to itself: ia: a → a.
* The identities should have the obvious property that for every f: a → b the following is true 
.center[ib ∘ f = f = f ∘ ia]
 In other words, identities are neutral to composition.

---

# What is a functor

In category theory, a functor is a structure preserving map from category to category, where “structure preserving” means that the relationships between objects and morphisms are retained.

fmap::(a->b)->fa->fb

---

# What is a functor

In category theory, a Functor F is a transformation between two categories A and B. We write F : A → B. F must map every object and arrow from A to B. In other words, 
.center[if a ∈ ob(A) then F(a) ∈ ob(B)]
and 
.center[if f ∈ Hom(A) then F(f) ∈ Hom(B)]

---

# What is a functor

* If f : a → b is an arrow in A then F(f):F(a) → F(B) is an arrow in B.
* F(idX) = id(F(X)), which means that each identity arrow in A is transformed to an identity arrow of the corresponding object in B.
* F(g) ∘ F(f) = F(g ∘ f), which means that the mapping of arrows’ composition in A is a composition of their mappings in B.

---

# What is a functor

<img src="./images/ch5_functor-3.jpg" width="100%">

---

# What is a functor

 Now we can transform the entire category with a List functor.

<img src="./images/c5_functor-2.png" width="100%">

 <!--
 https://nikgrozev.com/2016/03/14/functional-programming-and-category-theory-part-1-categories-and-functors/
 -->

---

# Functor laws : Identity law

If you pass the identity function (x => x) into a.map(), where a is any functor type, the result should be equivalent to a.

for:

.center[id:a->a]

We have:

.center[(F a).map(id) === F a]

---

# Functor laws : Composition law:

<image src="./images/ch5_functor-composition.png" width="100%">


<!---
https://nikgrozev.com/2016/03/14/functional-programming-and-category-theory-part-1-categories-and-functors/-->

---

# Implement Maybe Functor in typescript
```typescript
class Maybe<T>{
    constructor(private readonly value : T|null){}
    static some<T>(value: T) {
        return new Maybe(value);
    }
    static none<T>():Maybe<T>{
        return new Maybe<T>(null)
    }
    static of<T>(value:T | undefined):Maybe<T>{
        return !value ?  Maybe.none<T>() : Maybe.some(value);
    }
}
```

---

# Implement Maybe Functor in typescript
ifPresent and orElse
```typescript
    orElse(defaultValue: T): T {
        return (!this.value) ? defaultValue : this.value
    }
    ifPresent(f:(x:T)=>void){
        if(this.value) f(this.value)
    }
```

---

# Implement Maybe Functor in typescript

map

```typescript
    map<F>(f: (v: T) => F): Maybe<F> {
        return this.value ? Maybe.of(f(this.value)) : Maybe.none();
    }
```

---

# Implement Maybe Functor in typescript

get published years from 1970 of a book.

none functional manner:
```typescript
const years = (book: Book):number|null => {
    const publishDate = book.publishDate;
    if (publishDate) {
        const year = parseInt(publishDate.year)
        if (year) 
            return 2019 - year
        else return null
    }else{
        return null
    }
}
```

---

# Implement Maybe Functor in typescript
functional manner:

```typescript
const years =(book:Book)=>
    Maybe.of(book.publishDate).map(x=>parseInt(x.year)).map(x=>x-1970)
```

---

# Why Functor(1)

The details of the underlying data structure implementation are abstracted away. Users don’t need to know if iteration is required, or how it’s handled if it is. You can map over arrays, streams, trees, or anything else.

---

# Why Functor(2)
Functors hide the types of the data they contain, which allows you to act on the containers using generic functions, without caring about what you’re storing inside them. You don’t need special arrays for numbers, and special arrays for strings. 

Instead, you pass functions into map() that can deal with the type contained inside the functor.

---

# Why Functor(3)
Mapping over an empty functor is the same as mapping over a functor containing many items. Switching logic is not needed in the case of an empty collection, and there’s no need to keep track of iteration state if the data structure enumerates over a collection of items.

---

# Why Functor(4)
Most importantly, functor allow you to easily compose functions over the data inside.

---



# From Functor To Monads

Functor: ( a=>b ) => F a => F b 

Monads: (a => M b) => M a => M b


<!--- 
a->b->Fa->Fb
https://codewithstyle.info/advanced-functional-programming-in-typescript-maybe-monad/

-->

---

# Monads in java : Optional

if user’s address can be null then it is better to return an Optional Address instead of plain Address.

```java
class User{
    ...
    Optional<Address> getAddress();
    ...
}
```

---


# Monads in java : Optional

We expect:
```java
Optional<Address> addressOptional 
    = userOptional.map(User::getAddress)
```

But actually we get:
```java
Optional<Optional<Address>> addressOptional 
    = userOptional.map(User::getAddress)
```

---

# Monads in java : Optional

In this case, we should use flatMap to unpack the result:

```java
Optional<Address> addressOptional 
    = userOptional.flatMap(User::getAddress)
```


---

# Monads
* Functions can compose: a => b => c becomes a => c
* Functors can compose functions with context: given F(a) and two functions, a => b => c,
return F(c).
* Monads can compose type lifting functions: a => M(b), b => M(c) becomes a => M(c)

---

# Monads : a writer example

How to trace chain of function invocation.

```typescript
class Writer<T> implements Monad<T>{
    constructor(readonly log : string,readonly value : T){}

    static of<T>(log:string,value:T){
        return new Writer<T>(log,value);
    }

    flatmap<F>(f:(v:T)=>Writer<F>):Writer<F>{
        const targetResult = f(this.value)
        return Writer.of(
            [this.log,targetResult.log].join(),
            targetResult.value
        )
    }
    map<F>(f:(v:T)=>F):Writer<F>{
        return Writer.of('map',f(this.value))
    }

}
```
---


# Monads : a writer example

Wrap functions to lift to monad

```typescript
const mToUpper = (v:string):Writer<string>=>{
    return Writer.of('mToUpper',v.toUpperCase() )
}

const mConcat = curry((v1:string,v2:string)=>{
    return Writer.of('mConcat',v1.concat(v2) )
})

const mLength = (v:string)=>{
    return Writer.of('mLength',v.length )
}
```
---

# Monads : a writer example

Compose functions:

```typescript
mToUpper('test')
    .flatmap(mConcat('case'))
    .flatmap(mLength)
    .trace('mToUpper_mConcat')
//output : m_chained:{"log":"mToUpper,mConcat,mLength","value":9}

m_compose3(mLength,mConcat('case '),mToUpper)('test').trace('m_composed')
//output : m_composed:{"log":"mToUpper,mConcat,mLength","value":9}

```

---

# Monads : Map
Map means, “apply a function to an a and return a b”. Given some input, return some output. The functor map operation does that inside the context of a container called a functor data type, which returns a new container with the results.

---

# Monads : Context
Context is the computational detail of the monad. 

The point of functors and monads is to abstract that context away so we don’t have to worry about it while we’re composing operations.

---

# Monads : Type lift

Type lift means to lift a type into a context, wrapping values inside a data type that supplies the computational context a => M(a).

---

# Monads : Flatten
Flatten can be used to unwrap an extra layer of context that might be added by applying a type lifting function using a functor map operation. 

 If you map a function of type a => M(b) with the functor map operation, it will return a value of type M(M(b)). Flatten unwraps the extra layer of context: M(M(b)) => M(b). 

---

# Monads : FlatMap

FlatMap is the operation that defines a monad. It combines map and flatten into a single operation used to compose type lifting functions (a => M(b)).

---



