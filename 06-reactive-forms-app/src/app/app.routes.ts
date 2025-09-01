import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: 'reactive',
  loadChildren: () => import('./reactive/reactive.routes').then((module) => module.reactiveRoutes )
},
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.routes') //aca no hace falta lo otro porque lo exportamos
},
{
  path: 'country',
  loadChildren: () => import('./country/country.routes').then((module) => module.countryRoutes )
},
{
  path: '**',
  redirectTo: 'reactive',
},

];
