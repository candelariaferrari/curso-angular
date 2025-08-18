import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Character } from '../../../interfaces/character.interface';
@Component({
  selector: 'dragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {
  //zoneless para trabajar con señales y no voy a estar usando zone.js

   //mandar info del componente padre "dragonball-super" al hijo, o sea este
  characters= input.required<Character[]>()
  listName= input.required<string>()
 }
