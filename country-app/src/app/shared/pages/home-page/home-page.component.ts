import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../../country/components/footer/footer.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, FooterComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
