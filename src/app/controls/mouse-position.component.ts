import { Component, ElementRef, Host, Input, OnInit, Optional } from '@angular/core';

import { MapidService, MapService } from '../shared/';

import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import OlMap from 'ol/Map';

/**
 * Add a Mouse position control to the map
 * The control can be set inside the map (using parent id) or outside (using a mapId attribute)
 */
@Component({
    selector: 'app-mouse-position',
    template: ''
})

export class MousePositionComponent implements OnInit {

    // Map id
    @Input() mapId: string;

    constructor(
        private readonly mapService: MapService,
        @Host() @Optional() private readonly mapidService: MapidService,
        private readonly elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        // Get the current map or get map by id
        const map: OlMap = this.mapService.getMap(this.mapidService || this.mapId);
        // Get the target if outside the map
        const target = this.elementRef.nativeElement.parentElement ? this.elementRef.nativeElement : undefined;
        // Create the control
        const ctrl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326',
            target,
            undefinedHTML: '&nbsp;'
        });
        map.addControl(ctrl);
    }
}
