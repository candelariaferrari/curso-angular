
//CENTRALIZAMOS LA VALIDACION DEL FORM

import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
  // Clase de utilidades para manejar validaciones de formularios
  // La idea es no repetir código en cada componente


  //expreciones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  //metodo para manejar los errores, ya que se repiten en los otros metedos
  //Método para transformar errores en mensajes legibles
  // Recibe los errores de un FormControl y devuelve un string
  static getTextError(errors: ValidationErrors) {
    console.log(errors);

    for (const key of Object.keys(errors)) { // Recorremos los tipos de error
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'pattern':
        if (errors['pattern'].requiredPattern === FormUtils.emailPattern){
          return 'El correo electronico no es correcto'
        }
        return 'error de patron contra expresion regular'

        default:
          return `Error de validacion no controlado ${{key}}`;
      }
    }
    return null // Si no hay errores conocidos, devuelve null
  }
  //metodos estaticos
  //Verifica si un campo de un FormGroup es inválido y fue tocado
  // Se usa en el template para mostrar/ocultar mensajes de error
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors && // ¿Tiene errores?
      form.controls[fieldName].touched  // ¿Ya fue tocado?
    );
  }

  //Devuelve el mensaje de error de un campo dentro de un FormGroup
  // Usa el método getTextError para no repetir la lógica
  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null; // Si el campo no existe

    const errors = form.controls[fieldName].errors ?? {}; // Tomamos los errores


    return FormUtils.getTextError(errors) //llamamos el metodo de los errores

  }

  // Verifica si un campo dentro de un FormArray es inválido y fue tocado
  // Ej: una lista de inputs dinámicos (como juegos favoritos)
  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
      // ¿Ese índice tiene errores? --  ¿Ya fue tocado?

    )
  }


  //Devuelve el mensaje de error de un campo dentro de un FormArray
  // Ej: "Juego favorito 1 es requerido"
  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null; // Si no hay controles

    //verificar los errores
    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors) //llamamos el metodo de los errores

  }




    // Validador personalizado para comprobar si dos campos son iguales
    // Ejemplo típico: password === confirmPassword
  static isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl) => {
      // AbstractControl nos permite acceder al formulario completo o a un grupo de controles

      const field1Value = formGroup.get(field1)?.value;
      // Obtenemos el valor del primer campo (ej: 'password')

      const field2Value = formGroup.get(field2)?.value;
      // Obtenemos el valor del segundo campo (ej: 'confirmPassword')

      // Si son iguales → no hay error (null)
      // Si son distintos → devolvemos un error con la key "passwordsNotEqual"
      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

}
