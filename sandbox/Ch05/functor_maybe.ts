import { reduce, curry, prop, compose, toUpper, length,split } from 'ramda'
const trace = curry(<T>(label:string,v:T) => {
    console.log(label+":")
    console.log(v);
    return v;
})
const parseInteger = (s : string | undefined | null) => s ? parseInt(s) : null

class Maybe<T>{
    constructor(private readonly value: T | null) { }
    map<F>(f: (v: T) => F): Maybe<F> {
        return this.value ? Maybe.of(f(this.value)) : Maybe.none();
    }
    flatmap<F>(f: (v: T) => Maybe<F>): Maybe<F> {
        return this.value ? f(this.value) : Maybe.none();
    }
    static some<T>(value: T) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Maybe(value);
    }
    static none<T>(): Maybe<T> {
        return new Maybe<T>(null)
    }
    static of<T>(value: T | undefined): Maybe<T> {
        return !value ? Maybe.none<T>() : Maybe.some(value);
    }
    orElse(defaultValue: T): T {
        return (!this.value) ? defaultValue : this.value
    }

    ifPresent(f:(x:T)=>void){
        if(this.value) f(this.value)
    }
}

type Book = {
    isbn: number
    title: string
    desc?: string
    publishDate?: {
        year: string,
        month: string
    }
}


const books: Book[] = [
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
]

//map: a->b->[a]->[b]
//a->b,a->b->b,b,[a]->[b]

Maybe.of(books[1].publishDate).ifPresent(x=>console.log(x))

const myears =(book:Book)=>{
    return Maybe.of(book.publishDate)
        .map(x=>x.year)
        .map(x=>parseInt(x))
        .map(x=>x-1970)
}

const years = (book: Book):number|null => {
    const publishDate = book.publishDate;
    if (publishDate) {
        const syear = publishDate.year
            const year = parseInt(publishDate.year)
            if (year) 
                return year - 1970
            else return null
    }else{
        return null
    }
}

/*
    fprop("publishDate",book)
        .map(x=>fprop("year",x))
        .map((x:any)=>x-1970)
*/

const fprop = curry(<T, P extends keyof T>(p: P, v: T): Maybe<T[P]> => {
    return Maybe.of(v[p])
})

// const years = (book: Book):number|null => {
//     const publishDate = book.publishDate;
//     if (publishDate) {
//         const syear = publishDate.year
//         return parseInt(syear)
//     }else{
//         return null
//     }
// }



console.log(years(books[1]))

//(v:T)=>T[P]

// console.log(fprop("desc", books[0]).map(split(" ")).map(x => x.length))
// console.log(fprop("desc", books[0]).map((x: string) => x.length), split(" "))
