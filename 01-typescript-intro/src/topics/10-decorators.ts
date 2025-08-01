//Decoradores normalmente vamos a usar los que ya estan creados para nosotros
//son funciones especiales que se adjuntan a diferentes objetos
// casi siempre vamos a usar los decoradores que angular creo por nosotros.
//modifican el comportamiento de clases, funciones y metodos
function classDecorator( constructor: any){ //esta funcion se puede adjuntar a las clases, en las propiedades y en los metodos
   return class extends constructor {
    newProperty = 'New property';
    hello = 'override'
   }
}

@classDecorator
export class SuperClass {
    public myProperty: string = 'abc123';
    print(){
        console.log(('Hola mundo'));
        
    }
}

console.log(SuperClass); //imprimimos la definicion de la clase

const myClass = new SuperClass() 
console.log(myClass); //esta es la instancia de la clase
