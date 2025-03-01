import { afterNextRender, Component } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  #map: Map | undefined;

  constructor() {
    afterNextRender(() => {
      this.#map = new Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/hybrid/style.json?key=MZCjtFvEvhy0zEdhtmhp',
        center: [0, 0],
        zoom: 1,
        hash: true
      });
    });
  }
}