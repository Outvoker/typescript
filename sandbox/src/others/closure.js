"use strict";
const outer = () => {
    let m = 100;
};
function init() {
    let state = 0;
    function increment() {
        state += 1;
        return state;
    }
    increment();
}
init();
class Square {
    constructor() {
        this.type = "Square"; //<-discriminant for class, since TS3.4
    }
}
class Triangle {
    constructor() {
        this.type = "Triangle"; //<-discriminant class, before TS3.4
    }
}
