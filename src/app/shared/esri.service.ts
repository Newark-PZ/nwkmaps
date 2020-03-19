import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service to query data from NewGIN Esru Rest Service
 * @method getEsriLayer() Function to query data from NewGIN Esri Rest Service using view extents and url
 */
@Injectable()
export class EsriService {
    serviceUrl = 'https://services1.arcgis.com/WAUuvHqqP3le2PMh/arcgis/rest/services/2017_zoning_layer/FeatureServer/';
    layer = '0';
    resp;
    constructor(
        public http: HttpClient) { }
    /**
     * Function to query data from NewGIN Esri Rest Service using view extents and url
     * @param EXTENT current view extent
     * @param PROJECTION input projection
     * @param ESRIJSONFORMAT esrijson format object
     * @param VECTORSOURCE vector source to add features to
     */
    getEsriLayer(): any {
        const url = this.serviceUrl + this.layer + '/query?where=1%3D1&objectIds=&' +
        'time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&' +
        'distance=&units=esriSRUnit_Foot&relationParam=&outFields=BLOCK_LOT,PROPLOC,ZONINGCODE&returnGeometry=true&maxAllowableOffset=&' +
        'geometryPrecision=&outSR=EPSG:3857&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&' +
        'returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&' +
        'resultOffset=&resultRecordCount=&f=json';

        return fetch(`${url}`)
            .then(response => response.json())
            .then((data) => data);
    }

}
