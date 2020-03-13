import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartoSQLResp } from './carto.models';

/**
 * Service to query data from NZLUR Carto
 * @method getZoning() Use blocklot and an sql query to info on specific parcels
 */
@Injectable()
export class CartoService {
  readonly API_BASE_URL = 'https://nzlur.carto.com:443/api/v2/sql?q=';
  constructor(
    public http: HttpClient) { }
/**
 * Function to query data from NZLUR Carto using blocklot
 * @param API_SELECT columns from table to retrieve: default to *
 * @param API_WHERE_BLOCK block of parcel to query
 * @param API_WHERE_LOT lot of parcel to query
 */
  getZoning(API_SELECT: string, API_WHERE_BLOCK: string, API_WHERE_LOT: string): Observable<any> {
    const SQL_QUERY =
      `select ${API_SELECT} from public.zoning_2 where blocklot = '${API_WHERE_BLOCK}-${API_WHERE_LOT}'`;

    return this.http.get<CartoSQLResp>(
      `${this.API_BASE_URL}${SQL_QUERY}`
    );
  }

}
