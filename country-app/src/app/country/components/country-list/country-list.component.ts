import { Component, input } from '@angular/core';

import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  countries =input.required<Country[]>();


}
