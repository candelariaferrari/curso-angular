import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
/* Layouts , componentes que lucen como paginas pero envuelven otras pantallas
 tienen un routeroutlot interno*/
@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './countryLayout.component.html',
})
export class CountryLayoutComponent { }
