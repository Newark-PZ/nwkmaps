import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import carto from '@carto/carto-vl';
import * as mapboxgl from 'mapbox-gl';

import { CartoService, MapService, CartoSQLResp, MapInput, ZoningFields } from '../shared/';
import {
    baseViz,
    luSource,
    luViz,
    zoningMapViz,
    zoningSource,
    geoLayerViz
} from '../layers/layers';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-map',
    styleUrls: ['../../../node_modules/mapbox-gl/src/css/mapbox-gl.css'],
    template: `
        <div id='map' [ngStyle]="mapStyle"></div>
        <p-sidebar [(visible)]="sideBarDisplay" position="right" styleClass="p-col-12 p-md-10 p-lg-8 p-xl-6">
            <app-sidepanel [mapInput]='clicked' [propInfo]='propInfo'></app-sidepanel>
        </p-sidebar>
        `
})

export class MapComponent implements OnInit {
    @Input() parcelView;
    mapStyle = {
        'border-radius': '.5rem',
        display: 'flex',
        height: '75vh',
        margin: 'auto',
        position: 'relative'
    };
    hoodClicked = '';
    lotClicked = '';
    hoveredStateId;
    parcelhover;
    clicked: MapInput = {hood: '', lot: ''};
    propInfo: ZoningFields = { code: '' };
    geoLayer;
    mainLayer = new carto.Layer('mainLayer', zoningSource, zoningMapViz);
    popup;
    map: mapboxgl.Map;
    sideBarDisplay = false;

    constructor(readonly cartodata: CartoService, readonly mapper: MapService) {}

    ngOnInit(): void {
        fetch('assets/data/NwkNeighborhoods.geojson')
            .then(response => response.json())
            .then((data) => this.addGeoLayer(data));
        this.map = new mapboxgl.Map({
            center: [-74.1723667, 40.735657],
            container: 'map',
            dragRotate: false,
            maxZoom: 18,
            style: carto.basemaps.positron,
            touchZoomRotate: false,
            zoom: 12
        });
        const nav = new mapboxgl.NavigationControl({
            showCompass: false,
            showZoom: true
        });
        this.map.addControl(nav, 'top-left');
        carto.setDefaultAuth({
            apiKey: '0c3e2b7cbff1b34a35e1f2ce3ff94114493bd681',
            user: 'nzlur'
        });
        const interactivity = new carto.Interactivity(this.mainLayer);
        this.popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        interactivity.on('featureEnter', event => {
            event.features.forEach(feature => {
                feature.color.blendTo('opacity(DeepPink, 0.5)');
            });
            if (event.features.length > 0) {
                const vars = event.features[0].variables;
                this.popup.setHTML(`
                    <div>
                        <h3 class ="h3">${vars.proploc.value}</h3>
                    </div>
                `);
                this.popup.setLngLat([event.coordinates.lng, event.coordinates.lat]);
                if (!this.popup.isOpen()) {
                    this.popup.addTo(this.map);
                }
            } else {
                this.popup.remove();
            }
        });

        interactivity.on('featureLeave', event => {
            event.features.forEach(feature => {
                    feature.color.reset();
            });
        });
        interactivity.on('featureClick', event => {
            if (event.features.length > 0) {
                // tslint:disable-next-line: no-string-literal
                this.lotClicked = event.features[0].variables['blocklot'].value;
                this.clicked.block = this.lotClicked.split('-')[0];
                this.clicked.lot = this.lotClicked.split('-')[1];
                this.getPropInfo(this.clicked);
                this.sideBarDisplay = true;
            } else {
                this.sideBarDisplay = false;
            }
        });
        this.mainLayer.addTo(this.map, 'watername_ocean');
    }
    zoneLabel = (data: string) => `<a class="btn ${data}">${data}</a>`;
    updateViz(layer): any {
        switch (layer) {
            case 'landuse':
                this.mainLayer.update(luSource, luViz);
                break;
            case 'zoning':
                this.mainLayer.update(zoningSource, zoningMapViz);
                break;
            default:
                return this.mainLayer.update(zoningSource, baseViz);
        }
    }
    addGeoLayer(data): any {
        const source = new carto.source.GeoJSON(data);
        this.geoLayer = new carto.Layer('geoLayer', source, geoLayerViz);
        this.geoLayer.addTo(this.map, 'watername_ocean');
        const geojsonFeatures = this.map.querySourceFeatures('geoLayer').map(feature => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    // tslint:disable-next-line: no-non-null-assertion
                    coordinates: feature.properties!.getRenderedCentroid()
                },
                properties: {
                    // tslint:disable-next-line: no-string-literal no-non-null-assertion
                    label_field: `${feature.properties!.NAME}`,
                }
            };
        });
        this.map.addSource('geoLayerLabelsSource', {
            type: 'geojson', data: `type: 'FeatureCollection', features: ${geojsonFeatures}`
        });

        // Style labels
        this.map.addLayer({
            id: 'geoLayerLabels',
            type: 'symbol',
            source: 'geoLayerLabelsSource',
            layout: {
                'text-field': ['get', 'NAME'],
                'text-letter-spacing': 0.1,
                'text-max-width': 5,
                'text-transform': 'uppercase',
                'text-font': ['Segoe UI', 'Open Sans'],
            },
            paint: {
                'text-color': '#333',
                'text-halo-color': '#fff',
                'text-halo-width': 1,
                'text-halo-blur': 0.5
            },
        });
        this.map.resize();
    }
    changeGeo(geolayer): any {
        fetch(`assets/data/${geolayer}.geojson`)
            .then(response => response.json())
            .then((data) => {
                // Define layer
                const source = new carto.source.GeoJSON(data);
                this.geoLayer.update(source, geoLayerViz);
        });
    }
    getPropInfo(mapInputter: MapInput): void {
        // tslint:disable-next-line: no-non-null-assertion
        this.cartodata.getZoning('*', mapInputter.block!, mapInputter.lot!)
            .subscribe(
                ( data: CartoSQLResp ) => {
                    // tslint:disable-next-line: no-non-null-assertion
                    this.propInfo = data.rows[0]!;
                    // tslint:disable-next-line: no-non-null-assertion
                    this.clicked.labelStyle! = this.zoneLabel(this.propInfo.code ? this.propInfo.code : '');
                });
    }
}
