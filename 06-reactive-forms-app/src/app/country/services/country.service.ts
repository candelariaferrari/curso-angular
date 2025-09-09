import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  // Servicio centralizado para manejar la lógica relacionada a países
  // Se conecta con la API pública https://restcountries.com/v3.1
  // Devuelve observables para trabajar con datos asincrónicos (RxJS)

  private baseUrl = 'https://restcountries.com/v3.1'; // URL base de la API
  private http = inject(HttpClient); // Inyección de HttpClient para hacer requests HTTP

  // Lista de regiones predefinidas
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  // Getter: devuelve las regiones disponibles
  // Usamos el spread operator para devolver una copia y evitar mutaciones externas
  get regions(): string[] {
    return [...this._regions];
  }

  // ==============================
  // 1) Obtener países por región
  // ==============================
  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    // Si no viene región → devolvemos un observable con array vacío

    console.log({ region });

    // Armamos la URL con parámetros query "fields"
    // Solo pedimos cca3 (código), name (nombre) y borders (fronteras)
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    // Hacemos GET → devuelve Observable<Country[]>
    return this.http.get<Country[]>(url);
  }

  // ==========================================
  // 2) Obtener un país por código alfa (ISO)
  // ==========================================
  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    // Endpoint: /alpha/{code}
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    // Devuelve un Observable<Country>
    return this.http.get<Country>(url);
  }

  // ==================================================
  // 3) Obtener varios países a partir de un array de códigos
  // ==================================================
  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);
    // Si el array está vacío o no viene → devolvemos Observable<[]>

    const countriesRequests: Observable<Country>[] = [];

    // Recorremos cada código de país
    countryCodes.forEach((code) => {
      // Usamos el método anterior (getCountryByAlphaCode)
      const request = this.getCountryByAlphaCode(code);
      // Guardamos cada petición en un array de observables
      countriesRequests.push(request);
    });

    // combineLatest: espera todas las peticiones
    // Cuando todas responden → devuelve un array con los resultados
    return combineLatest(countriesRequests);
  }
}
