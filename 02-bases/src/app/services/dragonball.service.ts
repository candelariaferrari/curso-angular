import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';
//un servicio es una clase comun y corriente pero trabaja como un singleton

const loadFromLocalStorage = (): Character[] => { //lo que guardamos aca por mas que el navegador se vuelva a cargar, va quedar en el localstorage
  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters): []; //transformamos el string a un objeto


}
//en el localstorage se puede modificar desde la consola del navegador por eso tener en cuenta de solo 
// guardar informacion que no sea sensible 


// la info siembre va a quedar si pasa por el servicio, no se va a destruir
@Injectable({
  providedIn: 'root'
})
export class DragonballService {
  //arreglos

 /*  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
  ]); */
characters = signal<Character[]>(loadFromLocalStorage()); //cambiamos el arreglo por el load
// efectos es una funcion , que disparamos cada vez que queremos que algo suceda
saveToLocalStorage = effect(()=>{
  localStorage.setItem('characters', JSON.stringify(this.characters())) //JSON.stringify hace del arreglo un string

  console.log(`Character count ${this.characters().length}`); //en este caso cada vez que agregamos un dragonball el log va a cambiar

})




addCharacter(character: Character){
  this.characters.update( // para usar las señales y si necesitamos depender del valor anterior
    list => [...list, character]
  )
}
  constructor() { }

}
