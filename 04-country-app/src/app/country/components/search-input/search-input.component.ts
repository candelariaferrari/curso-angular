import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  placeholder = input('Buscar');
  value = output<string>(); //recomienda no poner on a la hora de los eventos

  debounceTime = input(1000); //tiempo que espera
  initialValue = input<string>();///valor actualizado de la caja de texto, la persona va a tener siempre el ultimo valor que emitio


  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => { //Efecto , cada vez que disparamos el inputvalue disparamos el efecto
    const value = this.inputValue();

    const timeout = setTimeout(() => { //
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => { //limpiamos el efecto, ej: cuando destruimos el componente, cada vez que tenemos un nuevo valor
      clearTimeout(timeout);
    });
  });


 }
