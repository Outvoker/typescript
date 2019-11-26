"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const monads_1 = require("../common/monads");
const trace_1 = require("../common/trace");
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
            if (!error)
                resolve(JSON.parse(body));
            else
                reject(error);
        });
    });
};
const fetchSpeciesName = (url, name) => {
    return fetchJson(url)
        .then((x) => monads_1.promiseOf(x.find(x => x.name === name)))
        .then(x => fetchJson(x.species))
        .then((x) => x.name);
};
fetchSpeciesName(people_url, 'Moro')
    .then(x => console.log(x));
fetchJson(people_url)
    .then((x) => monads_1.promiseOf(x.find(x => x.id === 'fc196c4f-0201-4ed2-9add-c6403f7c4d32')))
    .then(x => Promise.all(x.films.map(x => fetchJson(x))))
    .then(x => x.map(x => x.title))
    .then(x => trace_1.trace(x));
