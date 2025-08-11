import { Component, signal, computed } from '@angular/core';

interface Characters {
  id: number;
  name: string;
  power: number;
}
@Component({
  selector: 'app-dragonball-page',
  imports: [],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.scss'
})
export class DragonballPageComponent {
  //Formulario
  name = signal('Gohan');
  power = signal(100);



  //arreglos
  characters = signal<Characters[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
    { id: 3, name: 'Piccolo', power: 3000 },
    { id: 4, name: 'Yamcha', power: 500 },
  ]);

  powerClasses = computed(() => {
    return {
      'text-danger': true,
    }
  })

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
