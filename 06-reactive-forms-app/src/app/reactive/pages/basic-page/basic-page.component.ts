import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';



@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  //servicio del modulo
  //fb es formBuilder
  // Inyección de dependencias
  // "fb" es una instancia de FormBuilder (servicio que simplifica la creación de formularios)
  private fb = inject(FormBuilder);
  // Hacemos accesibles las utilidades de formularios en el template (para validaciones)
  formUtils = FormUtils;

  //Definición del formulario reactivo
  // Se usa FormBuilder para declarar los campos, valores iniciales y validaciones
  //la aparecia, validaciones de mi form
  myForm: FormGroup = this.fb.group({
    //primer valor, es lo que tiene cada uno , despues las validaciones
    //ej Estructura: campo: [ valorInicial, [validadores síncronos], [validadores asíncronos] ]
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });





  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    // Marcamos todos los campos como "tocados" para que se muestren los errores
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }

}
