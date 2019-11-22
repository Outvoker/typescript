"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var request_1 = __importDefault(require("request"));
var monads_1 = require("../common/monads");
var trace_1 = require("../common/trace");
Promise.resolve(10).then(function (x) { return x + 1; }).then(function (x) { return x * 10; }).then(function (x) { return console.log(x); });
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
var people_url = 'https://ghibliapi.herokuapp.com/people';
request_1.default(people_url, function (error, response, body) {
    try {
        if (!error) {
            var organisms = JSON.parse(body);
            var moro = organisms.find(function (x) { return x.name === 'Moro'; });
            if (moro) {
                request_1.default(moro.species, function (error, response, body) {
                    if (!error) {
                        var species = JSON.parse(body);
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
var fetchJson = function (url) {
    return new Promise(function (resolve, reject) {
        request_1.default(url, function (error, response, body) {
            if (error)
                reject(error);
            else
                resolve(JSON.parse(response.body));
        });
    });
};
fetchJson(people_url)
    .then(function (x) { return monads_1.promiseOf(x.find(function (x) { return x.name === 'Moro'; })); })
    .then(function (x) { return fetchJson(x.species); })
    .then(function (x) { return console.log(x.name); })
    .catch(function (e) { return console.log(e); });
var getMoroSpeciesName = function () {
    return node_fetch_1.default(people_url)
        .then(function (x) { return x.json(); })
        .then(function (x) { return monads_1.promiseOf(x.find(function (x) { return x.name === 'Moro'; })); })
        .then(function (x) { return node_fetch_1.default(x.species); })
        .then(function (x) { return x.json(); })
        .then(function (x) { return x.name; });
};
getMoroSpeciesName().then(function (x) { return trace_1.trace(x); }).catch(function (e) { return trace_1.trace(e); });
Promise.all([
    new Promise(function (resolve) {
        setTimeout(function () { return resolve(1); }, 1000);
    }),
    new Promise(function (resolve) {
        setTimeout(function () { return resolve(2); }, 1000);
    }),
    new Promise(function (resolve) {
        setTimeout(function () { return resolve(3); }, 1000);
    })
]).then(function (values) {
    console.log(values); // [ 1 ,2, 3]
});
