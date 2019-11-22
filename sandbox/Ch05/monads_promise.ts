import fetch from 'node-fetch'
import request from 'request';
import {promiseOf} from '../common/monads'
Promise.resolve(10).then(x=>x+1).then(x=>x*10).then(x=>console.log(x));

type Organisms = {
    name : string
    species : string //url
}

type Species ={
    name : string;
    classification : string
}


// request("https://ghibliapi.herokuapp.com/people",(error, response, body)=>{
//     if(!error){
//         const organisms:Organisms[] = JSON.parse(body)
//         organisms.map(x=>request(x.species,(error, response, body)=>{
//             if(!error){
//                 const species:Species = JSON.parse(body)
//                 console.log(species)
//             }else{
//                 console.log(error)
//             }
//         }))
//     }else
//         console.log(error)
// })

fetch("https://ghibliapi.herokuapp.com/people")
    .then(x=>x.json())
    .then((x:Organisms[])=> promiseOf(x.find(x=>x.name==='Moro')))
    .then(x=>fetch(x.species))
    .then(x=>x.json())
    .then((x:Species)=>console.log(x.name))
