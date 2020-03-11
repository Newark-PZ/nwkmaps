import {Clipboard} from '@angular/cdk/clipboard';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CartoService } from '../shared';
import { MapInput, ZoningFields } from '../shared/';

@Component({
    encapsulation: ViewEncapsulation.ShadowDom,
    selector: 'app-sidepanel',
    styleUrls: ['../app.component.scss'],
    templateUrl: './sidepanel.component.html'
})

export class SidePanelComponent {
    @Input() mapInput: MapInput = {
        hood: 'Click on a neighborhood to learn about it',
        zoneColor: 'black'
    };
    @Input() propInfo: ZoningFields;

    constructor(
        public blocklot: CartoService,
        public clipboard: Clipboard
        ) {  }

    copyVal(val, object): any {
      this.clipboard.copy(`${object} ${val}`);
    }
}
