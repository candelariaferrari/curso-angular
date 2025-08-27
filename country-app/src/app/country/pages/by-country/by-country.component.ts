import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',

})
export class ByCountryComponent {
  CountryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query')?? '';
  query = signal(this.queryParams);

  //opcion con rxResource
  countryResource = rxResource({
    request: () => ({
      query: this.query()
    }),
    loader: ({ request }) => {
      if (!request.query) return of([]); //un observable que va a regresar un array vacio
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
          hola:'mundo'
        },
      });
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
