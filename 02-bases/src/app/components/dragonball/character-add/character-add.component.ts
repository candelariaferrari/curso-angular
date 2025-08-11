import { Component, output, signal } from '@angular/core';

interface Characters {
  id: number;
  name: string;
  power: number;
}
@Component({
  selector: 'dragonball-character-add',
  //imports: [],
  templateUrl: './character-add.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAddComponent {
 //Formulario
 name = signal('');
 power = signal(0);

//OUTPUT
newCharacter = output<Characters>();
//definimos que nuestro componente emite algo, un personaje

 addCharacter() {
  // si no tenemos un nombre, o si no tenemos un power o si el power en menor o igual a 0
  if(!this.name() || !this.power() || this.power() <= 0) {
    return;
  }

  //si si tiene las otras cosas entonces crea un character nuevo
  const newCharacter:Characters ={
    //id: this.characters().length + 1,
    id: Math.floor(Math.random()*1000), //id randomm
    name: this.name(),
    power: this.power(),

  };
  //insertarlo en la lista de personajes,
  this.newCharacter.emit(newCharacter)

  //this.characters.update((list)=>[...list, newCharacter])
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
