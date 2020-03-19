import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartoService, CartoSQLResp, MapInput, ZoningFields, GoogleService } from '../shared';
import { geoStyles, ApiConfig, labelStyle } from './map.layers';
import { MessageService } from 'primeng/api';

import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultControls, ZoomToExtent, ScaleLine } from 'ol/control';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { Coordinate } from 'ol/coordinate';
import {fromLonLat, toLonLat} from 'ol/proj';
import { XYZ, UTFGrid, Vector as VectorSource } from 'ol/source';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-map',
    template: `
        <div id='map' #map [ngStyle]="mapStyle"></div>
        <p-contextMenu [target]="map" [model]="contextMenu"></p-contextMenu>
        <p-toast key="addressToast" position="bottom-center">
            <ng-template let-message pTemplate="message">
                <div class="p-grid">
                    <div  class="p-col-8" style="text-align: center">
                        <h3>{{message.summary}}</h3>
                        <p>{{message.detail}}</p>
                    </div>
                    <div class="p-col p-grid p-align-stretch p-justify-even p-dir-col">
                        <p-button icon="pi pi-info" (click)="openPropInfoBar()" styleClass="p-col-12"></p-button>
                        <p-button icon="pi pi-google"
                            (click)="this.google.openStreetView(this.contextMenuCoords[0], this.contextMenuCoords[1])"
                            styleClass="p-col-12">
                        </p-button>
                    </div>
                </div>
            </ng-template>
        </p-toast>
        <p-sidebar [(visible)]="sideBarDisplay" position="right" styleClass="p-col-12 p-md-10 p-lg-8 p-xl-6">
            <app-sidepanel [mapInput]='clicked' [propInfo]='propInfo'></app-sidepanel>
        </p-sidebar>
        `
})

export class MapComponent implements OnInit {
    mapStyle = {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        margin: '0',
        position: 'absolute'
    };
    hoodClicked = '';
    lotClicked = '';
    clicked: MapInput = {hood: '', lot: '', proploc: ''};
    propInfo: ZoningFields = { code: '' };
    geoLayer;
    map: Map;
    sideBarDisplay = false;
    contextMenuCoords: Coordinate;
    contextMenu = [
        { icon: 'pi pi-info-circle', label: 'info' },
        { icon: 'pi pi-download', label: 'Show Street View', command: () => {
          this.google.openStreetView(this.contextMenuCoords[0], this.contextMenuCoords[1]);
        }}
    ];
    extentBtn;
    mapsApiUrl = `https://nzlur.carto.com/api/v1/map/`;
    url;
    cartoLayer;
    gridLayer;

    constructor(
        readonly cartodata: CartoService,
        public google: GoogleService,
        public messageService: MessageService) {}

    ngOnInit(): void {
        this.extentBtn = document.createElement('span');
        this.extentBtn.innerHTML = `<i class="pi pi-globe"></i>`;
        this.map = new Map({
            controls: defaultControls().extend([
                new ZoomToExtent({
                    extent: [
                        fromLonLat([-74.0617852, 40.6733126])[0],
                        fromLonLat([- 74.0617852, 40.6733126])[1],
                        fromLonLat([- 74.2853199, 40.7910592])[0],
                        fromLonLat([-74.2853199, 40.7910592])[1]],
                    label: this.extentBtn
                }),
                new ScaleLine({ units: 'us' })
            ]),
            layers: [
                new TileLayer({
                    source: new XYZ({ urls: ['https://d.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png'] }),
                    zIndex: 0
                }),
                new TileLayer({
                    source: new XYZ({ urls: ['https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png'] }),
                    zIndex: 4
                })
            ],
            target: 'map',
            view: new View({
                center: fromLonLat([-74.1723667, 40.735657]),
                maxZoom: 18,
                zoom: 13
            })
        });
        this.setParcelViz('base');
        this.setGeoLayer('NwkNeighborhoods');
        this.map.on('click', (evt) => {
            const viewResolution = (evt.map.getView().getResolution());
            (this.gridLayer.getSource() as UTFGrid).forDataAtCoordinateAndResolution(evt.coordinate, viewResolution,
                (data) => {
                    this.lotClicked = data.blocklot;
                    this.clicked.proploc = data.proploc;
                });
            this.clicked.block = this.lotClicked.split('-')[0];
            this.clicked.lot = this.lotClicked.split('-')[1];
            this.contextMenuCoords = toLonLat(evt.coordinate).reverse();
            this.messageService.clear(); // clears messages of toast components
            this.messageService.add({
                sticky: true,
                key: 'addressToast',
                summary: this.clicked.proploc,
                detail: `Block ${this.clicked.block}, Lot ${this.clicked.lot}`
            });
        });
    }
    setParcelViz(layer): any {
        this.url = `${this.mapsApiUrl}?config=${encodeURIComponent(JSON.stringify(ApiConfig(layer)))}`;
        (layer !== 'none') ?
        fetch(this.url, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                const hackUrls = x => x.replace('layer0', '0');
                const baseJson = response.metadata.layers['0'].tilejson.raster;
                const cartoRasterTiles = baseJson.tiles.map(hackUrls);
                if (this.cartoLayer && this.gridLayer) { [this.cartoLayer, this.gridLayer].forEach(l => l.dispose()); }
                this.cartoLayer = new TileLayer({ source: new XYZ({ urls: cartoRasterTiles })});
                this.gridLayer = new TileLayer({
                    source: new UTFGrid({
                        tileJSON: { version: '2.2.0', grids: baseJson.grids.map(hackUrls), tiles: baseJson.grids.map(hackUrls) }
                    })
                });
                [this.cartoLayer, this.gridLayer].forEach(l => this.map.addLayer(l));
            })
            : [this.cartoLayer, this.gridLayer].forEach(l => l.dispose());
    }
    setGeoLayer(geolayer): any {
        (geolayer !== 'none')
        ? fetch(`assets/data/${geolayer}.geojson`)
            .then(response => response.json())
            .then((data) => {
                if (this.geoLayer) { this.geoLayer.dispose(); }
                this.geoLayer = new VectorLayer({
                    source: new VectorSource({
                        features: (new GeoJSON()).readFeatures(data, {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3857'
                        })
                    }),
                    style: (feature) => {
                        labelStyle.getText().setText(feature.get('NAME'));
                        return [geoStyles, labelStyle];
                    },
                    zIndex: 5
                });
                this.map.addLayer(this.geoLayer);
            }).then(() => this.map.updateSize())
        : this.geoLayer.dispose();
    }
    setLayerViz(layer): any {
        this.url = `${this.mapsApiUrl}?config=${encodeURIComponent(JSON.stringify(ApiConfig(layer)))}`;
        (layer !== 'none') ?
        fetch(this.url, { method: 'GET', headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                const hackUrls = x => x.replace('layer0', '0');
                const baseJson = response.metadata.layers['0'].tilejson.raster;
                const cartoRasterTiles = baseJson.tiles.map(hackUrls);
                if (this.cartoLayer && this.gridLayer) { [this.cartoLayer, this.gridLayer].forEach(l => l.dispose()); }
                this.cartoLayer = new TileLayer({ source: new XYZ({ urls: cartoRasterTiles })});
                this.gridLayer = new TileLayer({
                    source: new UTFGrid({
                        tileJSON: { version: '2.2.0', grids: baseJson.grids.map(hackUrls), tiles: baseJson.grids.map(hackUrls) }
                    })
                });
                [this.cartoLayer, this.gridLayer].forEach(l => this.map.addLayer(l));
            })
            : [this.cartoLayer, this.gridLayer].forEach(l => l.dispose());
    }
    getPropInfo(mapInputter: MapInput): void {
        // tslint:disable: no-non-null-assertion
        this.cartodata.getZoning('*', mapInputter.block!, mapInputter.lot!)
            .subscribe(
                ( data: CartoSQLResp ) => {
                    this.propInfo = data.rows[0]!;
                });
    }
    openPropInfoBar(): any {
        this.getPropInfo(this.clicked);
        this.sideBarDisplay = true;
    }
}
