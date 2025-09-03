
//CENTRALIZAMOS LA VALIDACION DEL FORM

import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

// Función auxiliar que simula un delay de 2.5 segundos
// Útil para probar validaciones asincrónicas (ej: contra un servidor real)
async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}
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

    for (const key of Object.keys(errors)) {// Recorremos los tipos de error
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'email':
          return `El valor ingresado no es un correo electrónico`;

        case 'emailTaken':
          return `El correo electrónico ya está siendo usado por otro usuario`;

        case 'noStrider':
          return `No se puede usar el username de strider en la app`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor ingresado no luce como un correo electrónico';
          }

          return 'Error de patrón contra expresión regular';

        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
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


  //metodo asincrono
  // Validación personalizada asincrónica (ejemplo: consulta a servidor para verificar emails ya registrados)
  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('Validando contra servidor');

    await sleep(); // 2 segundos y medio, simula un delay de 2.5 segundos, como si fuese un request HTTP

    const formValue = control.value;
    // Si el email ingresado es este, devolvemos un error de "emailTaken"
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }
    // Si no hay problema → no devolvemos error
    return null;
  }

  // Validación personalizada síncrona
  // Bloquea el valor "strider" → si lo detecta, devuelve un error { noStrider: true }
  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value === 'strider' ? { noStrider: true } : null;
  }
}
