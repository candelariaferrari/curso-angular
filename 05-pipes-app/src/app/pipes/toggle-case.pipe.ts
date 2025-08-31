//el nombre del archivo es "el nombre del pipe + el pipe " para indicar que tipo de dato es
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  //selector que vamos a usar en el html
  name: 'toggleCase', //    'candelaria' | toggleCase
})
export class ToggleCasePipe implements PipeTransform { //transforma a mayuscula
  transform(value: string, upper: boolean = true): string {
    //condicion
    return upper ? value.toUpperCase() : value.toLowerCase();
  }
}
//value = argumento que recibe
//upper = segundo argumento
