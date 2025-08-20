import { Component } from '@angular/core';
import { environment } from '@environments/environment'; //alias que hicimos en el tsconfing

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class GifsSideMenuHeaderComponent {
  envs = environment
 }
