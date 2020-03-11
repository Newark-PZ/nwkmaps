import { Component, Input, OnInit } from '@angular/core';
import * as carto from '@carto/carto-vl';
import * as mapboxgl from 'mapbox-gl';

import bbox from '@turf/bbox';
import { nwkHood } from '../../assets/data/NwkNeighborhoods';
import { nwkWards } from '../../assets/data/NwkWards';

import { CartoService, MapService, CartoSQLResp, MapInput, ZoningFields } from '../shared/';
import {
    baseViz,
    hoods,
    hoodsInner,
    hoodsLabels,
    luSource,
    luViz,
    wardLabels,
    wards,
    wardsInner,
    zoningMapViz,
    zoningSource
} from '../layers/layers';

@Component({
    selector: 'app-map',
    styleUrls: ['../../../node_modules/mapbox-gl/src/css/mapbox-gl.css'],
    template: `
        <div id='map' class='map' [ngStyle]="mapStyle"></div>
        <app-sidepanel [mapInput]='clicked' [propInfo]='propInfo'></app-sidepanel>
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
    geoLayer = hoods;
    geoLayerInner = hoodsInner;
    geoLayerLabels = hoodsLabels;
    layersToAdd = [
        this.geoLayer,
        this.geoLayerInner,
        this.geoLayerLabels
    ];
    mainLayer = new carto.Layer('mainLayer', zoningSource, zoningMapViz);
    map: any;

    constructor(readonly cartodata: CartoService, readonly mapper: MapService) {}

    ngOnInit(): void {
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
        this.mainLayer.addTo(this.map, 'watername_ocean');
        const interactivity = new carto.Interactivity(this.mainLayer);
        this.map.on('load', () => {
            this.map.addSource('hoodMap', {
                data: nwkHood,
                type: 'geojson'
            });
            this.layersToAdd.forEach(
                layer => this.map.addLayer(layer, 'watername_ocean')
                );
            this.map.resize();
            this.map.on('mousemove', 'hoods-inner', e => {
                if (e.features.length > 0) {
                    if (this.hoveredStateId) {
                        this.map.setFeatureState(
                            { source: 'hoodMap', id: this.hoveredStateId },
                            { hover: false }
                        );
                    }
                    this.hoveredStateId = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'hoodMap', id: this.hoveredStateId },
                        { hover: true }
                    );
                }
            });
            this.map.on('click', 'hoods-inner', e => {
                if (e.features.length > 0) {
                    const NAME = 'NAME';
                    this.hoodClicked = e.features[0].properties[NAME];
                    const featurebound = bbox(e.features[0].geometry);
                    this.map.setFilter('hoods-inner', ['!=', 'NAME', this.hoodClicked]);
                    this.map.fitBounds(featurebound);
                    this.clicked = {
                        block: undefined,
                        hood: this.hoodClicked,
                        lot: undefined
                    };
                }
            });
            this.map.on('mousemove', 'mainLayer', e => {
                if (e.features.length > 0) {
                    if (this.parcelhover) {
                        this.map.setFeatureState(
                            { source: 'mainLayer', id: this.parcelhover },
                            { hover: false }
                        );
                    }
                    this.parcelhover = e.features[0].id;
                    this.map.setFeatureState(
                        { source: 'mainLayer', id: this.parcelhover },
                        { hover: true }
                    );
                }
            });
            interactivity.on('featureClick',  e => {
                const blocklot = 'blocklot';
                if (e.features.length > 0) {
                    this.lotClicked = e.features[0].variables[blocklot].value;
                    this.clicked.block = this.lotClicked.split('-')[0];
                    this.clicked.lot = this.lotClicked.split('-')[1];
                    this.getPropInfo(this.clicked);
                }
            });
        });
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
    changeGeo(geolayer): any {
        switch (geolayer) {
            case 'hoods':
                if (this.map.getLayer('wards')) {
                    this.map.removeLayer('wards');
                    this.map.removeLayer('wards-inner');
                    this.map.removeLayer('wards-labels');
                    this.map.addLayer(hoods, 'watername_ocean');
                    this.map.addLayer(hoodsInner, 'watername_ocean');
                    this.map.addLayer(hoodsLabels, 'watername_ocean');
                }
                break;
            case 'wards':
                if (!this.map.getSource('wardMap')) {
                    this.map.addSource('wardMap', {
                        data: nwkWards,
                        type: 'geojson'
                    });
                }
                if (this.map.getLayer('hoods')) {
                    this.map.removeLayer('hoods');
                    this.map.removeLayer('hoods-inner');
                    this.map.removeLayer('hoods-labels');
                    this.map.addLayer(wards, 'watername_ocean');
                    this.map.addLayer(wardsInner, 'watername_ocean');
                    this.map.addLayer(wardLabels, 'watername_ocean');
                }
                break;
            default:
                return;
        }
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
