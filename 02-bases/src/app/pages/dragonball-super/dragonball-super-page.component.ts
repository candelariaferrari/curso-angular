import { Component, signal, computed } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";

interface Characters {
  id: number;
  name: string;
  power: number;
}
@Component({
  selector: 'app-dragonball-page',
  imports: [CharacterListComponent],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.scss'
})
export class DragonballSuperPageComponent {
  //Formulario
  name = signal('');
  power = signal(0);



  //arreglos
  characters = signal<Characters[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
  ]);



  addCharacter() {
    // si no tenemos un nombre, o si no tenemos un power o si el power en menor o igual a 0
    if(!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    //si si tiene las otras cosas entonces crea un character nuevo
    const newCharacter:Characters ={
      id: this.characters().length + 1,
      name:this.name(),
      power: this.power()

    };
    //insertarlo en la lista de personajes,

    this.characters.update((list)=>[...list, newCharacter])
    this.resetFields()
    console.log("nombre" + this.name, this.power);
    //no sirve para cambiar el valor de la signal
    //this.characters().push(newCharacter);


  }
  //Para volver los inputs en cero
  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
