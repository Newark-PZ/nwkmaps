import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import carto from '@carto/carto-vl';
import * as mapboxgl from 'mapbox-gl';

import { CartoService, CartoSQLResp, MapElementsService, MapInput, ZoningFields, GoogleService } from '../shared/';
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
    template: `
        <div id='map' #map [ngStyle]="mapStyle"></div>
        <p-contextMenu [target]="map" [model]="contextMenu" ></p-contextMenu>
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
    mainLayer = new carto.Layer('mainLayer', zoningSource, baseViz);
    popup;
    map: mapboxgl.Map;
    sideBarDisplay = false;
    contextMenuCoords: mapboxgl.LngLat;
    contextMenu = [
        { icon: 'pi pi-info-circle', label: 'info' },
        { icon: 'pi pi-download', label: 'Show Street View', command: () => {
          this.google.openStreetView(this.contextMenuCoords.lat, this.contextMenuCoords.lng);
        }}
    ];

    constructor(readonly cartodata: CartoService, public google: GoogleService, public mapEls: MapElementsService) {}

    ngOnInit(): void {
        fetch('assets/data/NwkNeighborhoods.geojson')
            .then(response => response.json())
            .then((data) => this.addGeoLayer(data));
        this.map = new mapboxgl.Map({
            center: [-74.1723667, 40.735657],
            container: 'map',
            dragRotate: false,
            maxZoom: 18,
            style: carto.basemaps.voyager,
            touchZoomRotate: false,
            zoom: 12
        });
        const nav = new mapboxgl.NavigationControl({
            showCompass: false,
            showZoom: true
        });
        this.map.addControl(nav, 'bottom-right');
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
            if (event.features.length > 0) {
                const vars = event.features[0].variables;
                this.popup.setHTML(`
                  <div class="map-popup">
                    <h3>${vars.proploc.value}</h3>
                    <p>Block ${vars.blocklot.value.split('-')[0]}, Lot ${vars.blocklot.value.split('-')[1]}</p>
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
        this.map.on('contextmenu', (event: mapboxgl.MapMouseEvent) => this.contextMenuCoords = event.lngLat);
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
        this.mapEls.addLabels(this.map, data);
        this.map.resize();
    }
    changeGeo(geolayer): any {
        fetch(`assets/data/${geolayer}.geojson`)
            .then(response => response.json())
            .then((data) => {
                // Define layer
                const source = new carto.source.GeoJSON(data);
                this.geoLayer.update(source, geoLayerViz);
                const geolayersource = this.map.getSource('GeoLabelSource') as mapboxgl.GeoJSONSource;
                geolayersource.setData(data);
        });
    }
    getPropInfo(mapInputter: MapInput): void {
        // tslint:disable: no-non-null-assertion
        this.cartodata.getZoning('*', mapInputter.block!, mapInputter.lot!)
            .subscribe(
                ( data: CartoSQLResp ) => {
                    this.propInfo = data.rows[0]!;
                    this.clicked.labelStyle! = this.zoneLabel(this.propInfo.code ? this.propInfo.code : '');
                });
    }
}
