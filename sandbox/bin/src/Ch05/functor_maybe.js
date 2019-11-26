"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const trace = ramda_1.curry((label, v) => {
    console.log(label + ":");
    console.log(v);
    return v;
});
const parseInteger = (s) => s ? parseInt(s) : null;
class Maybe {
    constructor(value) {
        this.value = value;
    }
    map(f) {
        return this.value ? Maybe.of(f(this.value)) : Maybe.none();
    }
    flatmap(f) {
        return this.value ? f(this.value) : Maybe.none();
    }
    static some(value) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Maybe(value);
    }
    static none() {
        return new Maybe(null);
    }
    static of(value) {
        return !value ? Maybe.none() : Maybe.some(value);
    }
    orElse(defaultValue) {
        return (!this.value) ? defaultValue : this.value;
    }
    ifPresent(f) {
        if (this.value)
            f(this.value);
    }
    filter(pred) {
        if (!this.value || !pred(this.value))
            return Maybe.none();
        else
            return this;
    }
}
exports.Maybe = Maybe;
const books = [
    {
        isbn: 98739832,
        title: "Functional programming in typescript",
        desc: "A great book on FP"
    },
    {
        isbn: 97276333,
        title: "Domain driven design",
        publishDate: {
            year: '1999',
            month: '10'
        }
    }
];
//map: a->b->[a]->[b]
//a->b,a->b->b,b,[a]->[b]
Maybe.of(books[1].publishDate).ifPresent(x => console.log(x));
const myears = (book) => {
    return Maybe.of(book.publishDate)
        .map(x => x.year)
        .map(x => parseInt(x))
        .map(x => x - 1970);
};
const years = (book) => {
    const publishDate = book.publishDate;
    if (publishDate) {
        const syear = publishDate.year;
        const year = parseInt(publishDate.year);
        if (year)
            return year - 1970;
        else
            return null;
    }
    else {
        return null;
    }
};
/*
    fprop("publishDate",book)
        .map(x=>fprop("year",x))
        .map((x:any)=>x-1970)
*/
const fprop = ramda_1.curry((p, v) => {
    return Maybe.of(v[p]);
});
// const years = (book: Book):number|null => {
//     const publishDate = book.publishDate;
//     if (publishDate) {
//         const syear = publishDate.year
//         return parseInt(syear)
//     }else{
//         return null
//     }
// }
console.log(years(books[1]));
//(v:T)=>T[P]
// console.log(fprop("desc", books[0]).map(split(" ")).map(x => x.length))
// console.log(fprop("desc", books[0]).map((x: string) => x.length), split(" "))
