import { Routes } from "@angular/router";
import { CountryPageComponent } from "./pages/country-page/country-page.component";

export const countryRoutes: Routes = [
  {
    path: '', //la ruta aca nos la va a dar el sistema de rutas padre
    component: CountryPageComponent,

  },
];
export default countryRoutes;
