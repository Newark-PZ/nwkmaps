import { Component, ViewChild, OnInit } from '@angular/core';
import { MapComponent } from './map/map.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild(MapComponent) map: MapComponent;
  collapsed = true;
  menu: Array<MenuItem>;
  parcelView;
  mapNavStyle = {
    'border-radius': '.25rem',
    top: '1rem'
  };

  ngOnInit() {
    this.menu = [
      {
        items: [
          {
            command: () => { this.changeGeo('NwkNeighborhoods'); },
            label: 'Neighborhoods'
          },
          {
            command: () => { this.changeGeo('NwkWards'); },
            label: 'Wards'
          }
        ],
        label: 'Geographies'
      },
      {
        items: [
          {
            command: () => { this.changeLayer('base'); },
            id: 'base',
            label: 'Base'
          },
          {
            command: () => { this.changeLayer('zoning'); },
            id: 'zoning',
            label: 'Zoning'
          },
          {
            command: () => { this.changeLayer('landuse'); },
            id: 'landuse',
            label: 'Land Use'
          }
        ],
        label: 'Parcel Style'
      }
    ];
  }

  changeLayer(layer): any {
    this.map.updateViz(layer);
  }
  changeGeo(layer): any {
    this.map.changeGeo(layer);
  }
}
