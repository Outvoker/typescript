/*
默认绑定
隐式绑定
显式绑定
new 绑定

需要理解的是，this是动态绑定的，也就是说在运行的时候，根据函数的调用的上下文而绑定的。
*/

function f(){
    console.log(this)
}

//默认绑定
f()

//隐式绑定
const data = {
    m : "",
    f
}
data.f()

const bindedf = f.bind(data)

bindedf()
f.apply(data)

type classType = {new<T>():T}

