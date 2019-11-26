import fetch from 'node-fetch'
import request from 'request';
import {promiseOf} from '../common/monads'
import { trace } from '../common/trace';
Promise.resolve(10).then(x=>x+1).then(x=>x*10).then(x=>console.log(x));



/*
https://ghibliapi.herokuapp.com/people:
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
  ...
*/
type Organisms = {
    name : string
    species : string //url
}

/*
https://ghibliapi.herokuapp.com/species/af3910a6-429f-4c74-9ad5-dfe1c4aa04f2
{
  "id": "af3910a6-429f-4c74-9ad5-dfe1c4aa04f2",
  "name": "Human",
  "classification": "Mammal",
  "eye_colors": "Black, Blue, Brown, Blue, Grey, Green, Hazel",
  "hair_colors": "Black, Blonde, Brown, Grey, White",  
*/


type Species ={
    name : string;
    classification : string
}


// request("https://ghibliapi.herokuapp.com/people",(error, response, body)=>{
//     try{
//         if(!error){
//             const organisms:Organisms[] = JSON.parse(body)
//             organisms.map(x=>request(x.species,(error, response, body)=>{
//                 if(!error){
//                     const species:Species = JSON.parse(body)
//                     console.log(species)
//                 }else{
//                     console.log(error)
//                 }
//             }))
//         }else
//             console.log(error)
//     }catch(e){
//         //in case of JSON.parse exception
//         console.log(e);
//     }
// })

const people_url = 'https://ghibliapi.herokuapp.com/people'

request(people_url,(error, response, body)=>{
    try{
        if(!error){
            const organisms:Organisms[] = JSON.parse(body)
            const moro = organisms.find(x=>x.name==='Moro')
            if(moro){
                request(moro.species,(error,response,body)=>{
                    if(!error){
                        const species:Species = JSON.parse(body)
                        console.log(species.name);
                    }else{
                        console.log("error")
                    }
                })
            }else{
                console.log('error')
            }
        }
    }catch(e){
        console.log(e);
        
    }
})

const fetchJson = <T>(url:string) =>{
    return new Promise<T>((resolve,reject)=>{
        request(url,(error, response, body)=>{
            if(error) reject(error)
            else resolve(JSON.parse(response.body))
        })
    })    
}

fetchJson<Organisms[]>(people_url)
    .then((x:Organisms[])=> promiseOf(x.find(x=>x.name==='Moro')))
    .then((x:Organisms)=>fetchJson<Species>(x.species))
    .then((x:Species)=>console.log(x.name))
    .catch(e=>console.log(e))


const getMoroSpeciesName = ()=>{
    return fetch(people_url)
        .then(x=>x.json())
        .then((x:Organisms[])=> promiseOf(x.find(x=>x.name==='Moro')))
        .then((x:Organisms)=>fetch(x.species))
        .then(x=>x.json())
        .then((x:Species)=>x.name)
}

getMoroSpeciesName().then(x=>trace(x)).catch(e=>trace(e))

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



