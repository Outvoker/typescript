"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const url = "https://ghibliapi.herokuapp.com/people";
request_1.default(url, (error, response, body) => {
    console.log(body);
});
console.log("program finished");
