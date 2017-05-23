function* bears () {
    yield "panda";
    yield "pardo";
    yield "polar";
}

let bearsGenerator = bears();
console.log( bearsGenerator.next() );
console.log( bearsGenerator.next() );
console.log( bearsGenerator.next() );
console.log( bearsGenerator.next() );