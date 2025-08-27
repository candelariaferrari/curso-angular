import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';

import { Country } from '../../interfaces/country.interfaces';
import { firstValueFrom, of } from 'rxjs';

import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital.component.html',

})

// OPCION 2 ESTA EN PRUEBA TODAVIA
export class ByCapitalComponent {
  CountryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query')?? '';
  query = signal(this.queryParams);


  //opcion con rxResource
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,
          hola:'mundo'
        },
      });

      return this.CountryService.searchByCapital(request.query);
    },
  });

}


/***
 *  OPCION 1
export class ByCapitalComponent {
  countryService = inject(CountryService); //servicio

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([])

  onSearch(query: string) { // el query de buscqueda
    if (this.isLoading()) return; // si esta en true que no haga nada

    this.isLoading.set(true)
    this.isError.set(null);

    //console.log(query);
  //  this.countryService.searchByCapital(query) //disparar la peticion
  //     .subscribe(countries => {
  //       this.isLoading.set(false)
  //       this.countries.set(countries)
  //       /*    const c = CountryMapper.mapRestCountryArrayToCountryArray(countries)
  //     })
        this.countryService.searchByCapital(query) //disparar la peticion
        .subscribe({
          next: ( countries ) => {

              this.isLoading.set(false)
              this.countries.set(countries)
          },
          error: (err)=>  {
            console.log(err);

            this.isLoading.set(false)
            this.countries.set([])
            this.isError.set(err)
          },
        })

  }


}
 */


  /*   opcion con resource
  countryResource = resource({
      request: () => ({
        query: this.query()
      }),
      loader: async ({ request }) => {
        if (!request.query) return [];
       // return this.CountryService.searchByCapital(request.query)
       return await firstValueFrom(//nos permite transformar cualquier observable en una promesa
        this.CountryService.searchByCapital(request.query)
       )
      }
    }) */
