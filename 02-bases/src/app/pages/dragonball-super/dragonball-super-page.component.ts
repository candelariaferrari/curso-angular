import { Component, signal, computed, inject } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragonballService } from '../../services/dragonball.service';

interface Characters {
  id: number;
  name: string;
  power: number;
}
@Component({
  selector: 'app-dragonball-page',
  imports: [CharacterListComponent, CharacterAddComponent],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.scss'
})
export class DragonballSuperPageComponent {
/*  Forma tradicional
constructor(
  public dragonballService: DragonballService
 ){} */

//injectamos el servicio
  public dragonballService= inject(DragonballService)


}
