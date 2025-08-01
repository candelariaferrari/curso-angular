// CLASES es una manera de crearse un molde para poder crear instancias de ese mismo molde
// las variables dentro de la clase se conocen como property  y las funciones como metodos
/* export class Person {
    public name: string;
    private address: string;

    constructor(name: string, address: string){// metodo/funcion de una clase
        this.name =  name;
        this.address = address;
    }
}
    
const iroman = new Person('iroman', 'new york');*/
export class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    private address: string = 'No address'
  ) { }
}
//Extender una clase 
/* export class Hero extends Person{
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
    ){
        super(realName, 'New York') // es porque tengo el constructor de la clase person
    }

} */

export class Hero {
  //public person: Person; //lamamos a la clase person
  constructor(
    public alterEgo: string,
    public age: number,
    public realName: string,
    public person: Person
  ) {
    //this.person = new Person(realName)
  }
}

const tony = new Person('Tony','Stark', 'New york')
const iroman = new Hero('iroman', 45, 'Tony', tony);

console.log(iroman);
