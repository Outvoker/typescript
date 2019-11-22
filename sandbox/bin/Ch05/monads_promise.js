"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var monads_1 = require("../common/monads");
Promise.resolve(10).then(function (x) { return x + 1; }).then(function (x) { return x * 10; }).then(function (x) { return console.log(x); });
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
node_fetch_1.default("https://ghibliapi.herokuapp.com/people")
    .then(function (x) { return x.json(); })
    .then(function (x) { return monads_1.promiseOf(x.find(function (x) { return x.name === 'Moro'; })); })
    .then(function (x) { return node_fetch_1.default(x.species); })
    .then(function (x) { return x.json(); })
    .then(function (x) { return console.log(x.name); });
