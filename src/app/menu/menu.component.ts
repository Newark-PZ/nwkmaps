import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MenuRadio, Layers } from '../shared';
import { Sidebar } from 'primeng/sidebar';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-menu',
    styleUrls: ['../app.component.scss'],
    templateUrl: './menu.component.html'
})

export class MenuComponent {
    @ViewChild('menu') menu: Sidebar;
    @ViewChild('menuBtns') menuBtns: Menu;
    @Input() currentGeoVal = 'NwkNeighborhoods';
    @Input() geoVisible = false;
    @Input() geoStyles: MenuRadio;
    @Output() geoValChange: EventEmitter<any> = new EventEmitter();
    @Input() currentParcelVal = 'base';
    @Input() parcelVisible = false;
    @Input() parcelStyles: Array<MenuRadio>;
    @Output() parcelValChange: EventEmitter<any> = new EventEmitter();
    @Input() layersVisible = false;
    @Input() layers: Array<Layers>;
    @Input() layersSelected: Array<Layers>;
    @Output() layerStatusChange: EventEmitter<any> = new EventEmitter();
    @Input() menuDisplay: boolean;
    btnTextDisplay;
    menuClicked = false;
    @Input() menuButtons;
    @Input() visibleTable;

  valueChanged(model: MenuRadio, modelType: string, event: Event) {
    switch (modelType) {
      case 'geo':
        // tslint:disable: no-non-null-assertion
        this.geoValChange.emit(model!.id);
        break;
      case 'parcel':
        this.parcelValChange.emit(model!.id);
        break;
      default:
        this.layerStatusChange.emit(model);
        console.log(this.layerStatusChange.emit(this.layersSelected));
        break;
    }
  }
  layersChanged(event) {
    if (event.dropIndex) {
      this.layers[event.dropIndex].index = event.dropIndex;
      this.layers.forEach(l => l.index = this.layers.findIndex(lay => lay.id === l.id));
      if (this.layersSelected) {
        this.layersSelected.forEach(l => l.index = this.layers.find(layer => l.id === layer.id)!.index);
        this.layersSelected.sort(l => l.index);
      }
    }
    if (event.data) {console.log(this.layersSelected.sort(l => l.index)); }
  }
  menuBtnClick(btnId: string, btnLabel: string) {
    this.menuClicked = true;
    this.btnTextDisplay = 'none';
    switch (btnId) {
      case 'geo':
        this.parcelVisible = false;
        this.geoVisible = true;
        this.layersVisible = false;
        this.visibleTable = btnLabel;
        break;
      case 'parcels':
        this.parcelVisible = true;
        this.geoVisible = false;
        this.layersVisible = false;
        this.visibleTable = btnLabel;
        break;
      default:
        this.parcelVisible = false;
        this.geoVisible = false;
        this.layersVisible = true;
        this.visibleTable = btnLabel;
        break;
    }
  }
  menuReset() {
    this.menuClicked = false;
    this.btnTextDisplay = 'flex';
  }
}
