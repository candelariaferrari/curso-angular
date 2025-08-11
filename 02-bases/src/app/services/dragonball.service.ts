import { Injectable, signal } from '@angular/core';
import { Characters } from '../interfaces/character.interface';
//un servicio es una clase comun y corriente pero trabaja como un singleton

// la info siembre va a quedar si pasa por el servicio, no se va a destruir
@Injectable({
  providedIn: 'root'
})
export class DragonballService {
  //arreglos
  characters = signal<Characters[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
  ]);

addCharacter(character: Characters){
  this.characters.update( // para usar las señales y si necesitamos depender del valor anterior
    list => [...list, character]
  )
}
  constructor() { }

}
