import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService) //injectamos el servicio
  //gif que vamos a mostrar van a ser una señal, que seria un arreglo de Gif
  gifs = signal<Gif[]>([]) //empieza como un arreglo vacio []
  //evento
  onSearch(query: string) {
    console.log({ query });
    this.gifService.searchGifs(query).subscribe((resp) => {

      this.gifs.set(resp) //la respuesta es un arreglo de gif



      }
    ); //podemos poner el .subcribe porque ua tengo acceso al observable
  }
}
