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
        center: [9.552005, -84.494368],
        zoom: 17.6,
        hash: true
      });

      this.#map.on('load', () => {
        this.#map?.addSource('parcel', {
          type: 'geojson',
          data: 'parcel.geojson'
        });

        this.#map?.addLayer({
          id: 'parcel',
          type: 'line',
          source: 'parcel',
          paint: {
            'line-color': 'red',
            'line-width': 3
          } 
        }) 
      })
    });
  }
}