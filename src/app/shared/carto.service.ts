import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartoSQLResp } from './carto.models';

@Injectable()
export class CartoService {
  readonly API_BASE_URL = 'https://nzlur.carto.com:443/api/v2/sql?q=';
  // tslint:disable-next-line: restrict-plus-operands
  constructor(
    public http: HttpClient) { }

  getZoning(API_SELECT: string, API_WHERE_BLOCK: string, API_WHERE_LOT: string): Observable<any> {
    const SQL_QUERY =
      `select ${API_SELECT} from public.zoning_2 where blocklot = '${API_WHERE_BLOCK}-${API_WHERE_LOT}'`;

    return this.http.get<CartoSQLResp>(
      `${this.API_BASE_URL}${SQL_QUERY}`
    );
  }

}
