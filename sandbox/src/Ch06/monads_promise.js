"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const request_1 = __importDefault(require("request"));
const monads_1 = require("../common/monads");
const trace_1 = require("../common/trace");
Promise.resolve(10).then(x => x + 1).then(x => x * 10).then(x => console.log(x));
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
const people_url = 'https://ghibliapi.herokuapp.com/people';
request_1.default(people_url, (error, response, body) => {
    try {
        if (!error) {
            const organisms = JSON.parse(body);
            const moro = organisms.find(x => x.name === 'Moro');
            if (moro) {
                request_1.default(moro.species, (error, response, body) => {
                    if (!error) {
                        const species = JSON.parse(body);
                        console.log(species.name);
                    }
                    else {
                        console.log("error");
                    }
                });
            }
            else {
                console.log('error');
            }
        }
    }
    catch (e) {
        console.log(e);
    }
});
const fetchJson = (url) => {
    return new Promise((resolve, reject) => {
        request_1.default(url, (error, response, body) => {
            if (error)
                reject(error);
            else
                resolve(JSON.parse(response.body));
        });
    });
};
fetchJson(people_url)
    .then((x) => monads_1.promiseOf(x.find(x => x.name === 'Moro')))
    .then((x) => fetchJson(x.species))
    .then((x) => console.log(x.name))
    .catch(e => console.log(e));
const getMoroSpeciesName = () => {
    return node_fetch_1.default(people_url)
        .then(x => x.json())
        .then((x) => monads_1.promiseOf(x.find(x => x.name === 'Moro')))
        .then((x) => node_fetch_1.default(x.species))
        .then(x => x.json())
        .then((x) => x.name);
};
getMoroSpeciesName().then(x => trace_1.trace(x)).catch(e => trace_1.trace(e));
Promise.all([
    new Promise((resolve) => {
        setTimeout(() => resolve(1), 1000);
    }),
    new Promise((resolve) => {
        setTimeout(() => resolve(2), 1000);
    }),
    new Promise((resolve) => {
        setTimeout(() => resolve(3), 1000);
    })
]).then((values) => {
    console.log(values); // [ 1 ,2, 3]
});
