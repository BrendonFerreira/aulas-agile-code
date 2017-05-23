var frutas = [ "morango", "banana", "laranja", "abacaxi", "manga" ];

var saladaDeFrutas = {}

for( var i = 0; i < (frutas.length - 1); i++ ){
    saladaDeFrutas[frutas[i]] = (function(fruta){
        return function(){
            console.log(`Meu nome é ${fruta}`)
        }
    })(frutas[i])
}

saladaDeFrutas.morango()
saladaDeFrutas.banana()
saladaDeFrutas.laranja()
saladaDeFrutas.abacaxi()
