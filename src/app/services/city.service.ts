import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

const environmentUrl = environment.urls.core_base;
@Injectable()
export class CityService {
  coreBaseUrl: any;
  constructor(private http: Http) {
    this.coreBaseUrl = {
      addCity: environmentUrl + 'city/add',
      getAllCities: environmentUrl + 'city',
      getCityByDate: environmentUrl + 'city/filter'
    }
  }

  // get all cities
  getCityList(): Observable<any> {
    return this.http.get(this.coreBaseUrl.getAllCities).map(res => res.json());
  }

  // get city by date filter
  filterCityByDate(reqParams): Observable<any> {
    return this.http.post(this.coreBaseUrl.getCityByDate, reqParams).map(res => res.json());
  }

}
