import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interfaces';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  //peticion http
  private http = inject(HttpClient);

  //servicio
  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      //para atrapar el error
      catchError(error => {
        console.log('Error fetching ', error);
        //lanzar error
        return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}  `))
      })
    )
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url= `${API_URL}/name/${query}`;
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp) ),
      //para atrapar el error
      catchError(error => {
        console.log('Error fetching ', error);
        //lanzar error
        return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}  `))
      })
    )
  }

}
