import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/* Layouts , componentes que lucen como paginas pero envuelven otras pantallas
 tienen un routeroutlot interno*/
@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet],
  templateUrl: './countryLayout.component.html',
})
export class CountryLayoutComponent { }
