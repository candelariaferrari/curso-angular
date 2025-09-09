import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  // ===========================================
  // INYECCIONES
  // ===========================================
  fb = inject(FormBuilder); // para construir formularios reactivos
  countryService = inject(CountryService); // servicio con las peticiones HTTP

  // ===========================================
  // SIGNALS (estado reactivo con Angular signals)
  // ===========================================
  regions = signal(this.countryService.regions); // lista de regiones fijas
  countriesByRegion = signal<Country[]>([]);     // países según la región elegida
  borders = signal<Country[]>([]);               // países que limitan con el país elegido

  // ===========================================
  // FORMULARIO REACTIVO
  // ===========================================
  myForm = this.fb.group({
    region: ['', Validators.required],  // selección de continente
    country: ['', Validators.required], // selección de país dentro de esa región
    border: ['', Validators.required],  // selección de país fronterizo
  });

  // ===========================================
  // EFECTO PARA ESCUCHAR CAMBIOS DEL FORM
  // ===========================================
  onFormChanged = effect((onCleanup) => {
    // Nos suscribimos a los cambios de región y país
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    // Importante: limpiar suscripciones cuando el componente se destruye
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  // ===========================================
  // CUANDO CAMBIA LA REGIÓN
  // ===========================================
  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        // Cada vez que cambia la región, limpiamos los campos dependientes
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        // También vaciamos las listas (countriesByRegion y borders)
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        // Hacemos la petición para obtener países de esa región
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        // Guardamos en el signal la lista de países de la región seleccionada
        this.countriesByRegion.set(countries);
      });
  }

  // ===========================================
  // CUANDO CAMBIA EL PAÍS
  // ===========================================
  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        // Cada vez que cambia el país, limpiamos el campo border
        tap(() => this.myForm.get('border')!.setValue('')),
        // Evitamos valores vacíos
        filter((value) => value!.length > 0),
        // Traemos el país completo a partir del código seleccionado
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode ?? '')
        ),
        // Con la info del país, pedimos todos sus países fronterizos
        switchMap((country) =>
          this.countryService.getCountryNamesByCodeArray(country.borders)
        )
      )
      .subscribe((borders) => {
        // Guardamos en el signal la lista de fronteras disponibles
        this.borders.set(borders);
      });
  }
}
