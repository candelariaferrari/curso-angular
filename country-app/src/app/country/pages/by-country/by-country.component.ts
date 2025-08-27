import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',

})
export class ByCountryComponent {
  CountryService = inject(CountryService);
  query = signal('');
  //opcion con rxResource
  countryResource = rxResource({
    request: () => ({
      query: this.query()
    }),
    loader: ({ request }) => {
      if (!request.query) return of([]); //un observable que va a regresar un array vacio
      return this.CountryService.searchByCountry(request.query)

    }
  })
  /*   countryResource = resource({
      request: () => ({
        query: this.query()
      }),
      loader: async ({ request }) => {
        if (!request.query) return [];
       // return this.CountryService.searchByCapital(request.query)
       return await firstValueFrom(//nos permite transformar cualquier observable en una promesa
        this.CountryService.searchByCountry(request.query)
       )
      }
    }) */



}
