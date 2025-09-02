import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  // Inyecto el servicio FormBuilder para crear el formulario más fácilmente
  private fb = inject(FormBuilder);//fb es formBuilder

  // Hago disponible la clase de utilidades de formularios en el template
  formUtils = FormUtils;


  // Definición del formulario principal
  myForm: FormGroup = this.fb.group({
    // Campo 'name' con validaciones: requerido y mínimo 3 caracteres
    name: ['', [Validators.required, Validators.minLength(3)]],
    // Campo 'favoriteGames' como un FormArray con valores iniciales
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ],
      Validators.minLength(2) // mínimo 2 juegos
    ),
  });

  // OPCIONES para crear un nuevo FormControl (para agregar al array)
  // Opción 1 con FormBuilder → this.fb.control('')
  // newFavorite = this.fb.control([])

  //opcion 2 con new FormControl → más explícito
  newFavorite = new FormControl('', Validators.required)


  // Getter para acceder al FormArray desde el template
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }


  // Método para agregar un nuevo juego al array
  onAddToFavorites() {
    if (this.newFavorite.invalid) return; // Si el control es inválido, no hago nada
    const newGame = this.newFavorite.value;

    // Agrego un nuevo control al FormArray
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset(); //para resetearlo
  }

  // Método para eliminar un juego del array por índice
  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  // Método al enviar el formulario
  onSubmit() {
    console.log(this.myForm.value);
    // Marca todos los controles como "tocados" para mostrar los errores
    this.myForm.markAllAsTouched(); //PARA Marcar todos los errores que tenga el form antes de guardar
  }
}
