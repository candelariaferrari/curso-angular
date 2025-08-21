import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);


  constructor() {
    //creamos una instancia del gifs service
    this.loadTrendingGifs();
    console.log('servicio creado');

  }

  //peticion
  loadTrendingGifs() {
    //peticion GET al endpoint
    //el giphyresponse lo tomamos de las interfaces
    this.http
      .get<GiphyResponse>(`${environment.ghipyUrl}/gifs/trending`, { //lo sacamos de postman lo que esta fuera de {}
        params: {
          api_key: environment.ghipyApiKey, //lo ponemos con el _ porque asi lo muestra en postman
          limit: 20,
        },//la peticion no se va a disparar hasta que no se subcribe
      })
      .subscribe((resp) => {

        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        console.log({ gifs }); // si el dia de mañana en la web de giphy cambia algo solo tenemos que ir al mapper
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        /*
        this.trendingGifsLoading.set(false);
        console.log({ gifs }); */
      });
  }


  searchGifs(query: string) {//es un servicio que lo que regresa es un observable
    return this.http
      .get<GiphyResponse>(`${environment.ghipyUrl}/gifs/search`, { //lo sacamos de postman lo que esta fuera de {}
        params: {
          api_key: environment.ghipyApiKey,
          limit: 20,
          q: query,
        },
      })//metodo pipe permite encadenar funcionamientos especiales de los observables
      .pipe(//tap es un operador dispara efectos secundarios, ej cuando nuestro observable emita un valor va a pasar por aca
        //tap((resp) => console.log({ tap1: resp })),
        //map, permite poder barrer cada uno de los elementos de mi respuesta y regresar una transformacion
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)), //aca nos devuelve el arreglo solamente con la info que le pedimos
        );

  }
}
