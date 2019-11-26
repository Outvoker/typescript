//@ts-ignore
import {reduce, compose,curry,toUpper,split, toLower,prop,length} from 'ramda'

const trace = curry(<T>(label:string,v:T) => {
    console.log(`${label}:${v}`);
    return v;
})

class Maybe<T>{
    constructor(private readonly value : T|null){}
    //a->b -> Fa->Fb
    map<F>(f:(v:T)=>F):Maybe<F>{
        return this.value ? Maybe.of(f(this.value)):Maybe.none();
    }
    //a->Mb -> Ma -> Mb
    flatmap<F>(f:(v:T)=>Maybe<F>):Maybe<F>{
        return  this.value ? f(this.value) : Maybe.none();
    }
    static some<T>(value: T) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Maybe(value);
    }
    static none<T>():Maybe<T>{
        return new Maybe<T>(null)
    }
    static of<T>(value:T | undefined):Maybe<T>{
        return !value ?  Maybe.none<T>() : Maybe.some(value);
    }
    orElse(defaultValue:T) : T{
        return (!this.value) ? defaultValue : this.value
    }
}

type Book = {
    isbn:number
    title:string
    desc? : string
    publishDate? : {
        year? : string,
        month : string
    }
}

const books:Book[] = [
    {
        isbn : 98739832,
        title: "Functional programming in typescript"
    },
    {
        isbn : 97276333,
        title: "Domain driven design",
        publishDate:{
            year:"1999",
            month:"10"
        }
    }
]

//(v:T)=>T[P]
const prop = curry(<T,P extends keyof T>(p:P,v:T) : Maybe<T[P]>=>{
    return Maybe.of(v[p])
})

//a->b->a->Mb
const lift = <A,B>(f:(a:A)=>B):((a:A)=>Maybe<B>)=>{
    return (a:A)=> Maybe.of(f(a))
}

const lookup = curry((isbn : number,books:Book[]): Maybe<Book> =>{
    return Maybe.of(books.find(x=>x.isbn===isbn))
})

const myears =(book:Book)=>{
    return Maybe.of(book.publishDate)
        .map(x=>x.year)
        .map((x:any)=>parseInt(x))
        .map(x=>x-1970)
}

const years = (book: Book):number|null => {
    const publishDate = book.publishDate;
    if (publishDate) {
        const syear = publishDate.year
        if(syear){
            const year = parseInt(syear)
            if (year) 
                return year - 1970
            else return null
        }else return null;
    }else{
        return null
    }
}

console.log("years:"+JSON.stringify(years(books[1])))
console.log("myears:"+JSON.stringify(myears(books[1])))

console.log(lookup(97276333)(books).flatmap(prop('title')).orElse("").length)

//f1: b -> Mc , f2: a -> Mb  compose(f2,f1): a -> Mc
const composeM2 = <A,B,C>(f1:(b:B)=>Maybe<C>,f2:(a:A)=>Maybe<B>) =>{
    return (a:A)=>f2(a).flatmap(x=>f1(x))
}

const composeM3 = <A,B,C,D>(f1:(c:C)=>Maybe<D>,f2:(b:B)=>Maybe<C>,f3:(a:A)=>Maybe<B>) =>{
    return (a:A)=>f3(a).flatmap(b=>f2(b).flatmap(c=>f1(c)))
}
console.log(composeM3(lift(length),prop('title'),lookup(97276333))(books))
