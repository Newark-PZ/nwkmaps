import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';

// Openlayers map service to acces maps by id
// Inject the service in the class that has to use it and access the map with the getMap method.
// @example
//   import { MapService } from '../map.service';
//   import OlMap from 'ol/Map';
//   constructor(
//     private mapService: MapService,
//   ) { }
//   ngOnInit() {
//     // Get the current map
//     const map: OlMap = this.mapService.getMap('map');
//   }

@Injectable({
    providedIn: 'root'
})
export class MapService {

    /**
     * List of Openlayer map objects [ol.Map](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html)
     */
    map = {};

    /**
     * Create a map
     * @param id map id
     * @returns [ol.Map](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html) the map
     */
    createMap(id): Map {
        const map = new Map({
            target: id,
            view: new View({
                center: [-74.1723667, 40.735657],
                projection: 'EPSG:3857',
                zoom: 12
            })
        });

        return map;
    }

    /**
     * Get a map. If it doesn't exist it will be created.
     * @param id id of the map or an objet with a getId method (from mapid service), default 'map'
     */
    getMap(id): Map {
        // tslint:disable-next-line: no-parameter-reassignment
        id = ((id && id.getId) ? id.getId() : id) || 'map';
        // Create map if not exist
        if (!this.map[id]) {
            this.map[id] = this.createMap(id);
        }

        // return the map
        return this.map[id];
    }

    // Get all maps
    // NB: to access the complete list of maps you should use the ngAfterViewInit() method to have all maps instanced.
    // @return the list of maps
    getMaps(): any {
        return this.map;
    }

    // Get all maps
    // NB: to access the complete list of maps you should use the ngAfterViewInit() method to have all maps instanced.
    // @return array of maps
    getArrayMaps(): any {
        return Object.values(this.map);
    }

}
