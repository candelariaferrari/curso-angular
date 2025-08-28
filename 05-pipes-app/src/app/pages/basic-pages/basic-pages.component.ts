import { LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-pages',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-pages.component.html',
})
export default class BasicPagesComponent {
  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('candelaria');
  nameUpper = signal('CANDELARIA');
  fullName = signal('cANDELARIA Ferrari');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('tick');
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

/*   changeLocale(locale: AvailableLocale) {
    console.log({ locale });
    this.localService.changeLocale(locale);
  } */
 }
