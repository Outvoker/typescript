"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var request_1 = __importDefault(require("request"));
var monads_1 = require("../common/monads");
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
node_fetch_1.default(people_url)
    .then(function (x) { return x.json(); })
    .then(function (x) { return monads_1.promiseOf(x.find(function (x) { return x.name === 'Moro'; })); })
    .then(function (x) { return node_fetch_1.default(x.species); })
    .then(function (x) { return x.json(); })
    .then(function (x) { return console.log(x.name); })
    .catch(function (e) { return console.log(e); });
