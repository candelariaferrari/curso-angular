//Funciones BASICAS
 function addNumber(a:number ,b: number):number{//definicion de nombre
    return a + b;
 };

 function addNumber2():void{// no tiene un retorno cuando le ponemos void

 };

 //addNumber(1,2);

 //FUNCION DE FLECHA
const addNumberArrow =(a: number, b:number):string =>{
    return `${ a + b }`; //`` esos iconos nos permite hacer caracteres mlultilinea y una inyeccuib de una expresion de javascritp

}

//Primero colocar los que son obligatorios como "firtnumber", depsues los opcionales"secondNumber" y al ultimo los opcionales pero con valores por defecto "base"
function multiply(firstNumber: number, secondNumber?:number, base:number = 2){
    return firstNumber * base;
}



const result: number = addNumber(1,2);
const result2: string = addNumberArrow(4,5);
const multiplyResult: number = multiply(5)


console.log("resultado de funcion=" + result);

console.log({result2});

console.log(multiplyResult);

//FUNCIONES CON OBJETOS COMO ARGUMENTOS

interface Character{
    name: string;
    hp: number;
    showHp:()=> void //void no tiene que regresar nada
}
const healCharacter = ( character:Character, amount: number )=> {
    character.hp += amount;
}

const strider: Character = {
    name: 'Cande',
    hp: 50,
    showHp(){
        console.log( `puntos de vida ${ this.hp}`);
        
    }
}
healCharacter(strider, 10); //este valor se suma al de strider
healCharacter(strider, 50); //este valor se suma al de strider
strider.showHp();//me muestra mis puntos de vida


export {}