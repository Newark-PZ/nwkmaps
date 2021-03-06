import { ClipboardModule } from '@angular/cdk/clipboard';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { sharedServices } from './shared';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { SidePanelComponent } from './sidebar/sidepanel.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

const primeModules = [
  ButtonModule,
  CardModule,
  CheckboxModule,
  ContextMenuModule,
  DropdownModule,
  FieldsetModule,
  MenuModule,
  OverlayPanelModule,
  PanelModule,
  RadioButtonModule,
  SidebarModule,
  SplitButtonModule,
  StepsModule,
  TableModule,
  ToastModule
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MenuComponent,
    SidePanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClipboardModule,
    primeModules,
    AppRoutingModule
  ],
  providers: [sharedServices, MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
