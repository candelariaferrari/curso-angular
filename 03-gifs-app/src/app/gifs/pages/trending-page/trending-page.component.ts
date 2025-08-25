import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

/* const imageUrls: string[] = [ //esto deberia ser un servicio
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
]; */


@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{  //AfterViewInit es uno de los pasos del ciclo de vida de los componentes
  //injectamos el servicio
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLElement>>('groupDiv')    //referencia al #groupDiv html . viewChild  para tomar referencias del html


  ngAfterViewInit(): void { //aca hacemos que el scroll quede guardado en donde quedo
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }


  onScroll(event: Event) {
    // console.log('evento: ' + event);
    //  para determinar si hay algun valor ?
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop; //'los pixeles del top, o sea los px que hacemos para abajo '
    const clientHeight = scrollDiv.clientHeight; //'los pixeles de la pantalla: , punto de vista
    const scrollHeight = scrollDiv.scrollHeight; // altura total
    console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight });

    const isABottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop)
    //console.log({ isABottom });

    if (isABottom) {
      this.gifService.loadTrendingGifs();
    }

  }


}

