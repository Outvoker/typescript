"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var trace = ramda_1.curry(function (label, v) {
    console.log(label + ":");
    console.log(v);
    return v;
});
var parseInteger = function (s) { return s ? parseInt(s) : null; };
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        this.value = value;
    }
    Maybe.prototype.map = function (f) {
        return this.value ? Maybe.of(f(this.value)) : Maybe.none();
    };
    Maybe.prototype.flatmap = function (f) {
        return this.value ? f(this.value) : Maybe.none();
    };
    Maybe.some = function (value) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Maybe(value);
    };
    Maybe.none = function () {
        return new Maybe(null);
    };
    Maybe.of = function (value) {
        return !value ? Maybe.none() : Maybe.some(value);
    };
    Maybe.prototype.orElse = function (defaultValue) {
        return (!this.value) ? defaultValue : this.value;
    };
    Maybe.prototype.ifPresent = function (f) {
        if (this.value)
            f(this.value);
    };
    return Maybe;
}());
var books = [
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
Maybe.of(books[1].publishDate).ifPresent(function (x) { return console.log(x); });
var myears = function (book) {
    return Maybe.of(book.publishDate)
        .map(function (x) { return x.year; })
        .map(function (x) { return parseInt(x); })
        .map(function (x) { return x - 1970; });
};
var years = function (book) {
    var publishDate = book.publishDate;
    if (publishDate) {
        var syear = publishDate.year;
        var year = parseInt(publishDate.year);
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
var fprop = ramda_1.curry(function (p, v) {
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
