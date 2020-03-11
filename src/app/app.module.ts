import { ClipboardModule } from '@angular/cdk/clipboard';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { sharedServices } from './shared';
import { MapComponent } from './map/map.component';
import { LayerComponent } from './layers/layers.component';
import { MousePositionComponent } from './controls/mouse-position.component';
import { SidePanelComponent } from './sidebar/sidepanel.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const primeModules = [
  ButtonModule,
  CardModule,
  ContextMenuModule,
  DropdownModule,
  MenubarModule,
  MenuModule,
  FieldsetModule,
  OverlayPanelModule,
  SidebarModule,
  SplitButtonModule,
  StepsModule,
  TableModule
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayerComponent,
    MousePositionComponent,
    SidePanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    primeModules,
    AppRoutingModule
  ],
  providers: [sharedServices],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
