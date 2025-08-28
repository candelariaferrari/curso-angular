import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from './../app/app.routes';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports:  [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
})
export default class NavBarComponent {
  routes = routes.map((route) => ({
    title: route.title ?? '', //title que esta en el routing
    path: route.path ?? '', //path que esta en el routing
  }));
}
