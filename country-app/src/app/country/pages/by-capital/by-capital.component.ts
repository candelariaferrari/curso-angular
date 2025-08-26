import { Component, inject } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital.component.html',

})
export class ByCapitalComponent {
  countryService = inject(CountryService); //servicio

  onSearch(query: string) { // el query de buscqueda
    console.log(query);
    this.countryService.searchByCapital(query) //disparar la peticion
      .subscribe( resp => {
        console.log(resp);

      })
  }


}
