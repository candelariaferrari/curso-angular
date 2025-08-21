import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  constructor(){
    //creamos una instancia del gifs service
    this.loadTrendingGifs;
  }

  //peticion
  loadTrendingGifs() {
    //peticion GET al endpoint
    //el giphyresponse lo tomamos de las interfaces
    this.http.get<GiphyResponse>(`${environment.ghipyUrl}/gifs/trending`),{ //lo sacamos de postman lo que esta fuera de {}
      params:{
        api_key: environment.ghipyApiKey, //lo ponemos con el _ porque asi lo muestra en postman
        limit: 20,
      }

    }
  }

}
