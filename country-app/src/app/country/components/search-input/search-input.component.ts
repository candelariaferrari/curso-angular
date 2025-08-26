import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholder = input('Buscar');
  value = output<string>(); //recomienda no poner on a la hora de los eventos

 }
