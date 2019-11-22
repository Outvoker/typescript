"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var url = "https://ghibliapi.herokuapp.com/people";
request_1.default(url, function (error, response, body) {
    console.log(body);
});
console.log("program finished");
