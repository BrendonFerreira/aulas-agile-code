function delayedSum(a,b) {
    return new Promise( (resolve, reject) => {
        if( !a || !b ){
            return reject("a e b precisam ser informados")
        } else {
            setTimeout( () => {
                resolve( a + b )
            }, 1000)
        }
    } )
}

(async function() {
    const result = await delayedSum(3, 9);
    console.log(result);
})()