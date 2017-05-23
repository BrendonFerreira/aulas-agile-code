class Shape {
    constructor( name ){
        this.name = name
    }
} 

class Square extends Shape {
    constructor( width=1, height=1 ){
        super( "Square" )
    }
    static calculateArea(x,y){
        return x * y
    }
}


let calculateArea = new Proxy(Square.calculateArea, {
    apply(fn, thisValue, args){
        console.time("calculateArea")
        let result = Reflect.apply(fn, thisValue, args)
        console.timeEnd("calculateArea")
        return result
    }
})

console.log( calculateArea(20, 10) )



let book = {
    name: "50 tons de cinza",
    author: {
        name: "Seila",
        age: 32 
    }
}

let bookProxy = new Proxy(book, {
    get(target, property) {
        console.log(`Consultando a propriedade ${property}`)
        return target[property]
    }
})

console.log(bookProxy.author.age)
