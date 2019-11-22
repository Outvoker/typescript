"use strict";
exports.__esModule = true;
//@ts-ignore
var ramda_1 = require("ramda");
var trace = ramda_1.curry(function (label, v) {
    console.log(label + ":" + v);
    return v;
});
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        this.value = value;
    }
    //a->b -> Fa->Fb
    Maybe.prototype.map = function (f) {
        return this.value ? Maybe.of(f(this.value)) : Maybe.none();
    };
    //a->Mb -> Ma -> Mb
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
    return Maybe;
}());
var books = [
    {
        isbn: 98739832,
        title: "Functional programming in typescript"
    },
    {
        isbn: 97276333,
        title: "Domain driven design",
        publishDate: {
            year: "1999",
            month: "10"
        }
    }
];
//(v:T)=>T[P]
var prop = ramda_1.curry(function (p, v) {
    return Maybe.of(v[p]);
});
//a->b->a->Mb
var lift = function (f) {
    return function (a) { return Maybe.of(f(a)); };
};
var lookup = ramda_1.curry(function (isbn, books) {
    return Maybe.of(books.find(function (x) { return x.isbn === isbn; }));
});
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
        if (syear) {
            var year = parseInt(syear);
            if (year)
                return year - 1970;
            else
                return null;
        }
        else
            return null;
    }
    else {
        return null;
    }
};
console.log("years:" + JSON.stringify(years(books[1])));
console.log("myears:" + JSON.stringify(myears(books[1])));
console.log(lookup(97276333)(books).flatmap(prop('title')).orElse("").length);
//f1: b -> Mc , f2: a -> Mb  compose(f2,f1): a -> Mc
var composeM2 = function (f1, f2) {
    return function (a) { return f2(a).flatmap(function (x) { return f1(x); }); };
};
var composeM3 = function (f1, f2, f3) {
    return function (a) { return f3(a).flatmap(function (b) { return f2(b).flatmap(function (c) { return f1(c); }); }); };
};
console.log(composeM3(lift(ramda_1.length), prop('title'), lookup(97276333))(books));
