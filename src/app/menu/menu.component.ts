import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MenuRadio, Layers } from '../shared';
import { Sidebar } from 'primeng/sidebar';
import { FormControl } from '@angular/forms';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-menu',
    styleUrls: ['../app.component.scss'],
    templateUrl: './menu.component.html'
})

export class MenuComponent {
    @ViewChild('menu') menu: Sidebar;
    @ViewChild('menuBtns') menuBtns: Menu;
    @Input() geoVisible = false;
    @Input() geoStyles: MenuRadio;
    @Output() geoValChange: EventEmitter<any> = new EventEmitter();
    @Input() parcelVisible = false;
    @Input() parcelStyles: Array<MenuRadio>;
    @Output() parcelValChange: EventEmitter<any> = new EventEmitter();
    @Input() layersVisible = false;
    @Input() layers: Array<Layers>;
    @Output() layerStatusChange: FormControl = new FormControl();
    @Input() menuDisplay: boolean;
    btnTextDisplay;
    menuClicked = false;
    @Input() menuButtons;

    valueChanged(model: MenuRadio | Layers, modelType: string, event: Event) {
      switch (modelType) {
        case 'geo':
          this.geoValChange.emit(model.status);
          break;
        case 'parcels':
          this.parcelValChange.emit(model.status);
          break;
        default:
          this.layerStatusChange.setValue(!model.status);
          break;
      }
  }
  layerVizChange(event) {

  }
  menuBtnClick(btnId: string) {
    this.menuBtns.renderer.setStyle('.menuBtns', 'font-size', '0');
    this.menuClicked = true;
    this.btnTextDisplay = 'none';
    switch (btnId) {
      case 'geo':
        this.parcelVisible = false;
        this.geoVisible = true;
        this.layersVisible = false;
        break;
      case 'parcels':
        this.parcelVisible = true;
        this.geoVisible = false;
        this.layersVisible = false;
        break;
      default:
        this.parcelVisible = false;
        this.geoVisible = false;
        this.layersVisible = true;
        break;
    }
  }
}
