import { Component } from '@angular/core';
import { MapComponent } from "./map/map.component";

@Component({
  selector: 'app-root',
  imports: [MapComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
