function *range(a: number, b?: number, step: number = 1) {
    if(b == undefined) {
      [a, b] = [0, a]
    }
    for(let i = a; i < b; i += step) {
      yield i
    }
  }
  
  const len = 10
  console.log(Array.from(range(0, len)).map(n => n.toString()))