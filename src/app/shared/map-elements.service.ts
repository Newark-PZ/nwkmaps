import { Injectable } from '@angular/core';

/**
 * Service to simplify adding map elements
 * @method addLabels() Function to add labels to geojson sourced layer
 */
@Injectable()
export class MapElementsService {
    /**
     * Function to add labels to geojson sourced layer
     * @param map the map in reference
     * @param data geojson data returned from fetch service
     */
    addLabels(map: mapboxgl.Map, data): any {
        map.on('load', () => {
            map.addSource('GeoLabelSource', { type: 'geojson', data });
            map.addLayer({
                id: 'geoLabels',
                layout: {
                    'text-field': ['get', 'NAME'],
                    'text-letter-spacing': 0.1,
                    'text-max-width': 4.5,
                    'text-transform': 'uppercase'
                },
                source: 'GeoLabelSource',
                type: 'symbol'
            });
        });
    }

}
