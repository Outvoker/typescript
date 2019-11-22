class Book{
    publishDate
}
var books Book
const years = (book: Book):number|null => {
    const publishDate = book.publishDate;
    if (publishDate) {
        const year = parseInt(publishDate.year)
        if (year) 
            return year - 1970
        else return null
    }else{
        return null
    }
}

class Maybe<T>{
    constructor(private readonly value: T | null | undefined){}
    static of<T>(v: T|null|undefined){
        return new Maybe(v)
    }
    static none<T>(){
        return new Maybe(null)
    }
    static some<T>(v:T){
        return new Maybe(v)
    }
    ifPresent(f:(x:T)=>void){
        if(this.value) f(this.value)
    }
    orElse(x:T){
        if(this.value) return this.value
        else return x
    }
    map<F>(func:(v:T)=>F):Maybe<F>{
        if(!this.value) return Maybe.none()
        else return Maybe.some(func(this.value))
    }
}

Maybe.of(books)
Maybe.some(books[0].publishDate)
Maybe.none()

Maybe.of(books[0].publishDate).ifPresent(x=>console.log(x.year))

Maybe.of(books[0].publishDate)
    .map(x=>parseInt(x.year))
    .map(x=>x-1971)