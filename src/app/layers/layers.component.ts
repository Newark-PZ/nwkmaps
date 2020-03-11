import { Component, Host, Input, OnInit } from '@angular/core';

import OlTileLayer from 'ol/layer/Tile';
import OlMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import { MapidService, MapService } from '../shared/';

// Add layers to a map
// @example
//   <app-map>
//     <app-layer></app-layer>
//   </app-map>

@Component({
    selector: 'app-layer',
    template: ''
})

export class LayerComponent implements OnInit {
    /** Layer */
    @Input() layer;
    /** Layer opacity */
    @Input() name;
    /** Layer opacity */
    @Input() opacity = 1;
    /** Layer visibility */
    @Input() visibility = true;

    // Define the service

    constructor(
        private readonly mapService: MapService,
        @Host() private readonly mapidService: MapidService
    ) { }

    // Add layer to the map
    ngOnInit(): void {
        // Get the current map
        const map: OlMap = this.mapService.getMap(this.mapidService);
        // Add the layer
        let layer;
        switch (this.layer) {
            case 'watercolor': {
                layer = new OlTileLayer({
                    source: new Stamen({ layer: 'watercolor' })
                });
                break;
            }
            case 'labels': {
                layer = new OlTileLayer({
                    source: new Stamen({ layer: 'toner-labels' })
                });
                break;
            }
            case 'OSM':
            default: {
                layer = new OlTileLayer({
                    source: new OSM()
                });
            }
        }
        layer.set('name', this.name || this.layer);
        layer.setOpacity(this.opacity);
        layer.setVisible(this.visibility);
        map.addLayer(layer);
    }

}
