import { Routes } from '@angular/router';

export const routes: Routes = [
  /*   {
      path:'dashboard',
      loadComponent: ()=> import('./gifs/pages/dashboard-page/dashboard-page.component').then((c)=>c.DashboardPageComponent)
    } */
  //forma mas elegante
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'), //voy al componente
    //RUTAS HIJAS , son arreglos de rutas
    children:[
      { //para mostrar un infinite scroll de todos los gifs que estan aca
        path:'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
      },
      {
        path:'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component')
      },
      {
        path:'history/:query', //argumentos dinamicos, ese "query" es el nombre de la llave , lo que aparece en consola,
        loadComponent: () => import('./gifs/pages/gif-history/gif-history.component')
      },
      { //aca a cualquier ruta que vaya me lleva al trending
        path:'**',
        redirectTo: 'trending'
      }
    ]

  },
  { //aca a cualquier ruta que vaya me lleva al dash
    path:'**',
    redirectTo: 'dashboard'
  }
];
