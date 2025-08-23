import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


//almacenar cache
//funcion propia, tipado para un objento donde sus llaves son dinamicas
//Record<string, Gif[]>

const GIF_KEY= 'gifs';

//creamos una funcion
const laodFromLocalStorage = () => {
  //verificar si tenemos gif
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //grabamos un objeto Record<string, gifs[]>
  //PARSEARLO = construirlo de nuevo
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs);

  return gifs

}



@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  //objeto, que va a ser una señal porque se va a cambiar
  searchHistory = signal<Record<string, Gif[]>>(laodFromLocalStorage())

  //señales computadas
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))
  constructor() {
    //creamos una instancia del gifs service
    this.loadTrendingGifs();
    console.log('servicio creado');

  }
  //efecto que se va a disparar cada vez que el searchHistory cambie
  saveGifsToLocalStorage = effect(()=> {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  })


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


  searchGifs(query: string): Observable<Gif[]> {//es un servicio que lo que regresa es un observable
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

        //historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            //propiedad computada
            [query.toLocaleLowerCase()]: items,
          })); //update actualiza el valor de la señal
        })
      );
  }
  // Historial
  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
    // searchHistory() es una señal
    // aputantamos a un objeto [query]
    // y si no tenemos ningun valor regramos un array vacio
  }

}
