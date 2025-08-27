import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  //para saber el url a donde tiene que regresar
  location =inject(Location)

  goBack(){
    this.location.back();
  }
}
