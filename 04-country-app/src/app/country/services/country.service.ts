import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interfaces';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  //peticion http
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); //lo inicializamos como un map
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  //servicio
  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    //Cache
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }


    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        //para atrapar el error
        catchError(error => {
          console.log('Error fetching ', error);
          //lanzar error
          return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}  `))
        })
      )
  }



  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []); //el of regresa un observable
    }

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(2000),
        //para atrapar el error
        catchError(error => {
          console.log('Error fetching ', error);
          //lanzar error
          return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}  `))
        })
      )
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map(countries => countries.at(0)),
        //para atrapar el error
        catchError(error => {
          console.log('Error fetching ', error);
          //lanzar error
          return throwError(() => new Error(`No se pudo obtener paises con ese codigo ${code}  `))
        })
      )
  }


  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;


    if (this.queryCacheCountry.has(region)) {
      return of(this.queryCacheCountry.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${region}`)
        );
      })
    );
  }
}
