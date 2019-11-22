"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var monads_1 = require("../common/monads");
var trace_1 = require("../common/trace");
var people_url = "https://ghibliapi.herokuapp.com/people";
var fetchFilmTitle = function (id) {
    node_fetch_1["default"](people_url)
        .then(function (x) { return x.json(); })
        .then(function (x) { return monads_1.promiseOf(x.find(function (x) { return x.id == id; })); })
        .then(function (x) { return Promise.all(x.films.map(function (x) { return node_fetch_1["default"](x).then(function (x) { return x.json(); }); })); })
        .then(function (x) { return x.map(function (x) { return x.title; }); })
        .then(function (x) { return trace_1.trace(x); });
};
fetchFilmTitle("fc196c4f-0201-4ed2-9add-c6403f7c4d32");
