import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //HashStrategy
    {
      provide:LocationStrategy,
      useClass: HashLocationStrategy //hace que aparezca un # en el directorio
      // funciona como un indicador que no hace que el nav web redireccione a esa carpeta
      // estamos siempre en el root pero añade ese # + tal pag y angular sabe que hacer
    }
  ]
};
