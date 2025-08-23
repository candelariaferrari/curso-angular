import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  gifService = inject(GifService);
  /*  otra opcion
   query = inject(ActivatedRoute).params.subscribe( //ruta activa, 'query' nombre de la llave
      params => {
        console.log({params});

      }
    ) */
  query = toSignal( // transforma cualquier observable en una señal
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  )
  /// inject(ActivatedRoute) inyectando el servicio del activatedroute
  /// .params obtenemos el observable
  /// .pipe( map contamos operador map mediante el pipe
  /// params => params ['query'] para tomar los parametros y ahi obtener el query
  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  })

}

