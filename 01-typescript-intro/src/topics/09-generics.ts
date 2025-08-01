// ponemos any si no sabemos que tipo va a ser, pero en realidad no es una buena practica poner any 
// porque asi, typescript no puede reconocer si tenemos algun error ya que any acepta todo 

export function whatMyType<T>(argument:T):T {  //<T> es una nomenclatura estandar 
return argument
}

let amIString = whatMyType<string>('hola mundo'); //aca decimos que la T es un string
let amINumber = whatMyType<number>(100);// aca decimos que la T es un number
let amIArray = whatMyType<number[]>([1,2,3,4,5]);// aca decimos que la T es un array de number

console.log(amIString.split(''));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));

