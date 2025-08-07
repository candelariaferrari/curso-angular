import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({ //Decorador
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { //Clase
 //public title: string = 'Cande Ferrari';
  title = 'Cande Ferari';
}
