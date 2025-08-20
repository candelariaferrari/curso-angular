import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet],
  templateUrl: './dashboard-page.component.html',
})
//agregue default para que funcione en el routing
export default class DashboardPageComponent { }
