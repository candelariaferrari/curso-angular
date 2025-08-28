import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LocaleService } from './services/locale.service';
import localeEs from '@angular/common/locales/es'; //importamos los idiomas
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es'); //aca buscamos los idiomas que necesitemos y los importamos
registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),


    //definir que tipo de idioma va a recibir
  {
  provide: LOCALE_ID, //token
    // useValue: 'fr',
    deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale,
  },
  ]


};
