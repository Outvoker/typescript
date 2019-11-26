import fetch from 'node-fetch'
import request from 'request';
import {promiseOf} from '../common/monads'
import { trace } from '../common/trace';

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
    id : string;
    name : string;
    species : string; //url
    films:string[]
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

const fetchJson = (url:string):Promise<any>=>{
    return new Promise<any>((resolve,reject)=>{
        request(url,(error, response, body)=>{
            if(!error) resolve(JSON.parse(body))
            else reject(error)
        })
    })
}

const fetchSpeciesName= (url:string,name : string):Promise<string>=>{
    return fetchJson(url)
        .then((x:Organisms[])=>promiseOf(x.find(x=>x.name===name)))
        .then(x=>fetchJson(x.species))
        .then((x:Species)=>x.name)
} 

fetchSpeciesName(people_url,'Moro')
    .then(x=>console.log(x))

fetchJson(people_url)
    .then((x:Organisms[])=>promiseOf(x.find(x=>x.id==='fc196c4f-0201-4ed2-9add-c6403f7c4d32')))
    .then(x=>Promise.all(
        x.films.map(x=>fetchJson(x)))
    )
    .then(x=>x.map(x=>x.title))
    .then(x=>trace(x))

