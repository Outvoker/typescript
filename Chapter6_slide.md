class: middle,center
<style>
  p { font-size: 150% } 
  li { font-size: 150% } 
  .remark-code {  font-size: 110% }
  .small { font-size: 70% }
</style>


# Asynchronous and Promise

Hands-On Functional Programming with Typescript by Remon H. Jansen
---

# Callback and higher-order functions
A function passed to another as an argument is known as a callback.
```javascript
var myCallback = function(){
    console.log("foo");
}

function bar(cb:()=>void){
    console.log(bar);
    cb();
}

bar(myCallback) //prints "bar" then prints "foo"
```

---

# Callback and higher-order functions
Anonymous callback function:
```javascript
bar(()=>{
    console.log("foo")
})
```

---

# Callback and higher-order functions

Callback function in OO world: listeners

```java
Button button =  new Button(shell, SWT.PUSH);

//register listener for the selection event
button.addSelectionListener(new SelectionAdapter() {
    @Override
    public void widgetSelected(SelectionEvent e) {
        System.out.println("Called!");
    }
});
```
---

# Asynchronous non-blocking I/O model

According to Wikipedia: **Asynchrony** in computer programming refers to the occurrence of events independently of the main program flow and ways to deal with such events.

---

# Asynchronous non-blocking I/O model
async.ts:

```javascript
const url = "https://ghibliapi.herokuapp.com/people"
request(url,(error, response, body)=>{
        console.log("request finished")
});

console.log("program finished")
```

---

# Asynchronous non-blocking I/O model
a JavaScript program is single threaded and all code is executed in a sequence, not in parallel. In JavaScript this is handled by using what is called an “asynchronous non-blocking I/O model”. 

Javascript engine keeps a single thread for your code

However, everything runs in parallel except your code:

* File I/O
* Network I/O
* Database I/O

---

# Callback hell

If we want to do a second request based on the result of a first one we have to do it inside the callback function of the first request because that is where the result will be available

---

# Callback hell

```javascript
request('http://www.somepage.com',  (firstError, firstResponse, firstBody)=>{
    if(firstError){
        // Handle error.
    }
    else 
        request(`http://www.somepage.com/${firstBody.someValue}`, 
            (secondError, secondResponse, secondBody)=>{
            if(secondError){
                // Handle error.
            }
            else {
                // Use secondBody for something
            }
        });
});
```
---

# Callback hell
* They make the code harder to follow and understand
* They make the code harder to maintain(refactor,reuse and so on)
* They make exception handling more difficult

---

# Promise
Promise is used to write better asynchronous code. 

A promise is an object that wraps an asynchronous operation and notifies when it’s done

---

# Promise
A promise must be in one of the following three states:

* Pending : The initial state of a promise.
* Fulfilled: also known as resolved, which representing a successful operation.
* Rejected: The state of a promise representing a failed operation

---

# Promise : Demo

First element from https://ghibliapi.herokuapp.com/people

```json
 {
    "id": "ba924631-068e-4436-b6de-f3283fa848f0",
    "name": "Ashitaka",
    "gender": "Male",
    "age": "late teens",
    "eye_color": "Brown",
    "hair_color": "Brown",
    "films": [
      "https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6"
    ],
    "species": "https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2",
    "url": "https://ghibliapi.herokuapp.com/people/ba924631-068e-4436-b6de-f3283fa848f0"
  },
```
---

# Promise : Demo

Species info from :
```url
https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2
```

```json
{
  "id": "af3910a6-429f-4c74-9ad5-dfe1c4aa04f2",
  "name": "Human",
  "classification": "Mammal",
  "eye_colors": "Black, Blue, Brown, Blue, Grey, Green, Hazel",
  "hair_colors": "Black, Blonde, Brown, Grey, White",  
  ...
}
```

---

# Promise : Demo

How to get Species name of Moro:

```javascript
request("https://ghibliapi.herokuapp.com/people",(error, response, body)=>{
    try{
        if(!error){
            const organisms:Organisms[] = JSON.parse(body)
            const moro = organisms.find(x=>x.name==='Moro')
            if(moro){
                request(moro.species,(error,response,body)=>{
                    if(!error){
                        const species:Species = JSON.parse(body)
                        console.log(species.name);
                    }else
                        console.log("error")
                })
            }else
                console.log('error')
        }
    }catch(e){
        console.log(e);
        
    }
})
```

# Promise : Demo

Type identified
```typescript
type Organisms = {
    name : string
    species : string //url
}
type Species ={
    name : string;
    classification : string
}
```
---

# Promise : Demo
Transformation process: 
species_name : (people_url:string) => (string)

Detailed transform steps:

(people_url:string) => 
(text_response:response) => 
(peoples:Organisms[]) =>
(Moro:Organisms) =>
(species_url:string) =>
(text_response:response) =>
(species : Species) =>
(species_name:string)

---

# Promise : Demo
```typescript
fetch("https://ghibliapi.herokuapp.com/people")
    .then(x=>x.json())
    .then((x:Organisms[])=> promiseOf(x.find(x=>x.name==='Moro')))
    .then((x:Organisms)=>fetch(x.species))
    .then(x=>x.json())
    .then((x:Species)=>console.log(x.name))
    .catch(e=>console.log(e))
```

---

# Promise

The true power of promises is shown when you have several asynchronous operations that depend on each other.

---

# Promise 
How to return a value from asynchronous operation?

return value via callback

```typescript
const getMoroSpeciesName = (cb:(name:string)=>void)=>{
    return fetch(people_url)
        .then(x=>x.json())
        .then((x:Organisms[])=> promiseOf(x.find(x=>x.name==='Moro')))
        .then((x:Organisms)=>fetch(x.species))
        .then(x=>x.json())
        .then((x:Species)=>cb(x.name))
}
```

---

# Promise 

Return promise instead of callback
```typescript
const getMoroSpeciesName = ()=>{
    return fetch(people_url)
        .then(x=>x.json())
        .then((x:Organisms[])=> promiseOf(x.find(x=>x.name==='Moro')))
        .then((x:Organisms)=>fetch(x.species))
        .then(x=>x.json())
        .then((x:Species)=>x.name)
}

getMoroSpeciesName()
    .then(x=>trace(x))
    .catch(e=>trace(e))
```

---

# Promise : create Promise
Callbacks are not interchangeable with Promises. This means that callback-based APIs cannot be used as Promises.
How to wrap callback-based API with promised?

```typescript
const fetchJson = (url:string) =>{
    return new Promise<any>((resolve,reject)=>{
        request(url,(error, response, body)=>{
            if(error) reject(error)
            else resolve(JSON.parse(response.body))
        })
    })    
}
```
---

# Promise : flow control
We can use many different types of asynchronous flow control when working with promises:

* **Concurrent**: The tasks are executed in parallel (as in the Promise.all example) 
* **Race**: The tasks are executed in parallel, and only the result of the fastest promise is returned 

---

# Promise : flow control (continue)


* **Series**: A group of tasks is executed in sequence, but the preceding tasks do not pass arguments to the next task 
* **Waterfall**: A group of tasks is executed in sequence, and each task passes arguments to the next task (as in the example)
* **Composite**: This is any combination of the previous concurrent, series, and waterfall approaches

---

# Promise : Concurrent

```typescript
Promise.all([
    new Promise<number>((resolve) => {
        setTimeout(() => resolve(1), 1000);
    }),
    new Promise<number>((resolve) => {
        setTimeout(() => resolve(2), 1000);
    }),
    new Promise<number>((resolve) => {
        setTimeout(() => resolve(3), 1000);
    })
]).then((values) => {
    console.log(values); // [ 1 ,2, 3]
});
```

---

# Promise : 练习






