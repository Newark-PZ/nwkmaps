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
        styleClass: 'menuBtns',
        command: (event) => this.menuComp.menuBtnClick(event.item.id)
      },
      {
        label: 'Parcel Style',
        icon: 'pi pi-palette',
        id: 'parcels',
        styleClass: 'menuBtns',
        command: (event) => this.menuComp.menuBtnClick(event.item.id)
      },
      {
        label: 'Overlays',
        icon: 'pi pi-list',
        id: 'overlays',
        styleClass: 'menuBtns',
        command: (event) => this.menuComp.menuBtnClick(event.item.id)
      }
    ];
    this.geoStyleList = [
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
        id: 'base',
        label: 'Base',
        name: 'geos',
        status: true,
        value: 'base'
      },
      {
        id: 'zoning',
        label: 'Zoning',
        name: 'geos',
        status: false,
        value: 'zoning'
      },
      {
        id: 'landuse',
        label: 'Land Use',
        name: 'geos',
        status: false,
        value: 'landuse'
      }
    ];
    this.layersList = [
      {
        index: 0,
        name: 'Historic Districts',
        status: true
      },
      {
        index: 1,
        name: 'Redevelopment Areas',
        status: true
      },
      {
        index: 2,
        name: 'Transit',
        status: true
      }
    ];
  }
  changeLayer(layer): any {
    this.map.updateViz(layer);
  }
  changeGeo(layer): any {
    this.map.changeGeo(layer);
  }
  toggleMenu() {
    this.menuComp.menuDisplay = true;
  }
}
