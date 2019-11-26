"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const ramda_1 = require("ramda");
const trace = ramda_1.curry((label, v) => {
    console.log(`${label}:${v}`);
    return v;
});
class Maybe {
    constructor(value) {
        this.value = value;
    }
    //a->b -> Fa->Fb
    map(f) {
        return this.value ? Maybe.of(f(this.value)) : Maybe.none();
    }
    //a->Mb -> Ma -> Mb
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
}
const books = [
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
const prop = ramda_1.curry((p, v) => {
    return Maybe.of(v[p]);
});
//a->b->a->Mb
const lift = (f) => {
    return (a) => Maybe.of(f(a));
};
const lookup = ramda_1.curry((isbn, books) => {
    return Maybe.of(books.find(x => x.isbn === isbn));
});
const myears = (book) => {
    return Maybe.of(book.publishDate)
        .map(x => x.year)
        .map((x) => parseInt(x))
        .map(x => x - 1970);
};
const years = (book) => {
    const publishDate = book.publishDate;
    if (publishDate) {
        const syear = publishDate.year;
        if (syear) {
            const year = parseInt(syear);
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
const composeM2 = (f1, f2) => {
    return (a) => f2(a).flatmap(x => f1(x));
};
const composeM3 = (f1, f2, f3) => {
    return (a) => f3(a).flatmap(b => f2(b).flatmap(c => f1(c)));
};
console.log(composeM3(lift(ramda_1.length), prop('title'), lookup(97276333))(books));
