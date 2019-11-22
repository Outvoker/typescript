import fetch from 'node-fetch'
import request = require('request')
import {promiseOf} from '../common/monads'
import { trace } from '../common/trace';

var people_url = "https://ghibliapi.herokuapp.com/people"

type Organisms = {
    name : string
    species : string //url
    id : string
    films : string[]
}

type films = {
    title : string
}

const fetchFilmTitle = (id:string)=> {
    fetch(people_url)
    .then(x=>x.json())
    .then((x:Organisms[])=>promiseOf(x.find(x=>x.id==id)))
    .then(x=>Promise.all(
        x.films.map(x=>fetch(x).then(x=>x.json()))
    ))
    .then(x=>x.map(x=>x.title))
    .then(x=>trace(x))
}
fetchFilmTitle("fc196c4f-0201-4ed2-9add-c6403f7c4d32");