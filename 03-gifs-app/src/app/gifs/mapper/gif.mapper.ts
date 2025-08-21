//la idea de un mapper es que recibimos un objeto ej: de giphy.com y regresamos un
// objeto basado en nuestra interfaz

import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interface";

export class GifMapper {
  //metodo que recibomos un GiphyItem y regresamos un Gif (PROPIO NUESTRO)
  static mapGiphyItemToGif(item: GiphyItem): Gif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    }
  }
  static mapGiphyItemsToGifArray(items: GiphyItem[]):Gif[]{ //regresa un arreglo de un gif
    return items.map ( this.mapGiphyItemToGif)
  }
}
