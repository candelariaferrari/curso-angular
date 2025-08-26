import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-country.interfaces';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital.component.html',

})
export class ByCapitalComponent {
  countryService = inject(CountryService); //servicio

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<RESTCountry[]>([])

  onSearch(query: string) { // el query de buscqueda
    if (this.isLoading()) return; // si esta en true que no haga nada

    this.isLoading.set(true)
    this.isError.set(null);

    //console.log(query);
    this.countryService.searchByCapital(query) //disparar la peticion
      .subscribe( countries => {
        //console.log(resp);
        this.isLoading.set(false)
        this.countries.set(countries)
      })
  }


}
