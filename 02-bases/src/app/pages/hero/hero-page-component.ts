import { ChangeDetectionStrategy, Component, signal } from "@angular/core";


@Component({
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, //estamos diciendo que quiero usar zoneJS
})
export class HeroPageComponent {

  //3 - Crear dos señales con los valores de Ironman y 45 respectivamente.
   name = signal<string>('Ironman');
   age = signal<number>(45);


  //4 - Crear un método llamado: getHeroDescription Debe de regresar la concatenación del nombre y la edad.
  getHeroDescription() {
    return `${this.name().toUpperCase()} - ${this.age()} años`;
    //Para leer el valor de una señal, se la invoca como una función: name() y age()
    // .toUpperCase() convierte ese string a mayúsculas
  };


  //5 -Implementar el método changeHero, no recibe argumentos y lo cambia a:
  changeHero(): void {
    this.name.set('Spiderman'); //El método .set(valor) se usa para cambiar el valor de una señal.
    this.age.set(22);
  }

  // 6 - Implementar el método: resetForm, el cual establece
  resetForm(): void {
    this.name.set('Ironmaaan');
    this.age.set(45);
  }

  // 7 - Implementar el método: chageAge, asignalor al evento click del botón respectivo.
  chageAge(){
    this.age.set(60)
    //cambia la edad a 60
  }

  // 8 - Extra: Tratar de mostrar el nombre (name) capitalizado en mayúscula sin crear una nueva señal.


}
