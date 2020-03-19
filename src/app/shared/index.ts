import { CartoService } from './carto.service';
import { EsriService } from './esri.service';
import { GoogleService } from './google.service';

export const sharedServices = [
  CartoService,
  EsriService,
  GoogleService
];

export * from './carto.models';
export * from './carto.service';
export * from './esri.service';
export * from './google.service';
export * from './menu.models';
