import { afterNextRender, Component, signal } from '@angular/core';
import { AttributionControl, GeolocateControl, Map } from 'maplibre-gl';

import { MaplibreMeasureControl } from '@watergis/maplibre-gl-terradraw';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  #map!: Map;
  #draw!: MaplibreMeasureControl;

  distance = signal<number>(0);

  constructor() {
    afterNextRender(() => {
      this.#map = new Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/hybrid/style.json?key=MZCjtFvEvhy0zEdhtmhp',
        center: [-84.494525, 9.55221],
        zoom: 17.6,
        hash: false,
        attributionControl: false,
      });

      this.#map.on('load', () => {
        this.#map.addSource('parcel', {
          type: 'geojson',
          data: 'parcel.geojson',
        });

        this.#map.addLayer({
          id: 'parcel',
          type: 'line',
          source: 'parcel',
          paint: {
            'line-color': 'red',
            'line-width': 3,
          },
        });
      });

      this.#map.addControl(
        new AttributionControl({
          compact: true,
        }),
        'bottom-left' // Position at bottom-left
      );

      this.#map.addControl(
        new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        'bottom-right'
      );

      // you can disable options if you don't want to use them.
      this.#draw = new MaplibreMeasureControl({
        modes: [
          'linestring',
          'polygon',
          'angled-rectangle',
          'select',
          'delete-selection',
          'delete',
          'download'
        ],
        open: true,
      });

      this.#map.addControl(this.#draw, 'top-left');
    });
  }
}
