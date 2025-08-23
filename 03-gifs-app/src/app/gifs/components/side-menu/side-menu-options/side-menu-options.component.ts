import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../../services/gifs.service';

interface MenuOption{ //las opciones del menu
  label: string,
  subLabel: string,
  route:string,
  icon: string
}

@Component({
  selector: 'gifs-side-menu-options',  // Nombre del componente para usar en HTML
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {

  gifService= inject(GifService)


   /**
   *Arreglo de opciones de menú
   *
   * Cada elemento es un objeto de tipo `MenuOption`
   * que define cómo se verá y a dónde navegará cada ítem.
   */
  menuOptions:MenuOption[]=[
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gif Populares',
      route:'/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscar',
      subLabel: 'Buscar gifs',
      route:'/dashboard/search'
    }
  ]
}
