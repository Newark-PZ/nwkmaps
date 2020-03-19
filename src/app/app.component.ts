import { Component, ViewChild, OnInit } from '@angular/core';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { MenuRadio, Layers } from './shared';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;
  @ViewChild(MenuComponent) menuComp: MenuComponent;
  collapsed = true;
  menu: Array<MenuItem>;
  parcelView;
  mapNavStyle = {
    'border-radius': '.25rem',
    top: '1rem'
  };
  menuDisplay = false;
  geoStyleList: Array<MenuRadio>;
  parcelStylesList: Array<MenuRadio>;
  layersList: Array<Layers>;

  ngOnInit() {
    this.menu = [
      {
        label: 'Geographies',
        icon: 'pi pi-compass',
        id: 'geo',
        styleClass: 'p-col-12 menuBtns'
      },
      {
        label: 'Parcel Style',
        icon: 'pi pi-palette',
        id: 'parcels',
        styleClass: 'p-col-12 menuBtns'
      },
      {
        label: 'Overlays',
        icon: 'pi pi-list',
        id: 'overlays',
        styleClass: 'p-col-12 menuBtns'
      }
    ];
    this.geoStyleList = [
      {
        id: 'none',
        label: 'None',
        name: 'geos',
        status: false,
        value: 'none'
      },
      {
        id: 'NwkNeighborhoods',
        label: 'Neighborhoods',
        name: 'geos',
        status: true,
        value: 'hoods'
      },
      {
        id: 'NwkWards',
        label: 'Wards',
        name: 'geos',
        status: false,
        value: 'wards'
      }
    ];
    this.parcelStylesList = [
      {
        id: 'none',
        label: 'Hide Parcels',
        name: 'parcels',
        status: false,
        value: 'none'
      },
      {
        id: 'base',
        label: 'Base',
        name: 'parcels',
        status: true,
        value: 'base'
      },
      {
        id: 'zoning',
        label: 'Zoning',
        name: 'parcels',
        status: false,
        value: 'zoning'
      },
      {
        id: 'landuse',
        label: 'Land Use',
        name: 'parcels',
        status: false,
        value: 'landuse'
      }
    ];
    this.layersList = [
      {
        id: 'histDists',
        index: 0,
        name: 'Historic Districts',
        status: false,
        value: 'landmarkdistricts_160420'
      },
      {
        id: 'redevAreas',
        index: 1,
        name: 'Redevelopment Areas',
        status: false,
        value: 'redevelopmentplanareas_170208'
      },
      {
        id: 'transit',
        index: 2,
        name: 'Transit',
        status: false,
        value: 'landmarkdistricts_160420'
      },
      {
        id: 'oppoZones',
        index: 3,
        name: 'Opportunity Zones',
        status: false,
        value: 'opertunity_zones'
      },
      {
        id: 'westMNI',
        index: 4,
        name: 'West Ward MNI',
        status: false,
        value: 'west_wardmni_copy'
      }
    ];
  }
  changeParcels(layer): any {
    this.map.setParcelViz(layer);
  }
  changeGeo(layer): any {
    this.map.setGeoLayer(layer);
  }
  toggleMenu() {
    this.menuComp.menuDisplay = true;
  }
}
