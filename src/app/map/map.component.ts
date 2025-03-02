import { afterNextRender, Component, signal } from '@angular/core';
import { AttributionControl, GeolocateControl, Map } from 'maplibre-gl';

import { TerraDraw, TerraDrawRectangleMode } from "terra-draw";
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  #map!: Map;
  #draw!: unknown;

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

      const map = this.#map;
      // Create Terra Draw
      const draw = new TerraDraw({
        // Using the MapLibre Adapter
        adapter: new TerraDrawMapLibreGLAdapter({ map }),

        // Add the Rectangle Mode
        modes: [new TerraDrawRectangleMode()],
      });


      // // //@ts-ignore
      // this.#draw = new MaplibreTerradrawControl({
      //   modes: [
      //     'point',
      //     'linestring',
      //     'polygon',
      //     'rectangle',
      //     'angled-rectangle',
      //     'circle',
      //     'sector',
      //     'sensor',
      //     'freehand',
      //     'select',
      //     'delete-selection',
      //     'delete',
      //     'download'
      //   ],
      //   open: true,
      // });

     
    });
  }
}
