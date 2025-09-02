

import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";


export class FormUtils {
  //expreciones regulares
  //metodo para manejar los errores, ya que se repiten en los otros metedos
  static getTextError (errors: ValidationErrors){
    for (const key of Object.keys(errors)) { //barremos las llaves de los errores110000
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
      }
    }
    return null
  }
  //metodos estaticos
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    );
  }


  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};


    return FormUtils.getTextError(errors) //llamamos el metodo de los errores

  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
      if (formArray.controls.length === 0) return null;

      //verificar los errores
      const errors = formArray.controls[index].errors ?? {};

      return FormUtils.getTextError(errors) //llamamos el metodo de los errores

    }


}
