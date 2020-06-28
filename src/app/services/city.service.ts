import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http } from '@angular/http';
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

  getCityList(): Observable<any> {
    return this.http.get(this.coreBaseUrl.getAllCities).map(res => res.json());
  }

  filterCityByDate(reqParams): Observable<any> {
    console.log('req', reqParams);
    return this.http.post(this.coreBaseUrl.getCityByDate, reqParams).map(res => res.json());
  }

}
