import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { reactiveRoutes } from '../../../reactive/reactive.routes';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? []; //para asegurarnos que siempre tengamos rutas y no caer en un undifine





@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**') //filtramos el undifine
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));


  authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Países',
      route: './country',
    },
  ];
}
