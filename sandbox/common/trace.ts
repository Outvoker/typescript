export { }

declare global {
    interface Object{
        trace(label:string):Object
    }
}

Object.prototype.trace = function(label:string){
    console.log(label + ":" +JSON.stringify(this));
    return this;
}

export const trace = <T>(v:T)=>{
    console.log(v);
    return v;
    
}