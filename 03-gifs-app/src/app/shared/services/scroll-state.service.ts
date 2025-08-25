import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {

  //si cambiamos los valores y usamos señales deberiamos seguir usando señales
  trendingScrollState = signal(0);


}
