import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MasterDto } from '../../pages/model-dto/master';
import { environment } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = `${environment.apiBaseUrl}/api/Master`;

  constructor(
    private http: HttpClient
  ) { }

  getPlans(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/plans`
    );
  }

  getCountries(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/countries`
    );
  }

  getStates(countryId: number): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/states?countryId=${countryId}`
    );
  }

  getCities(stateId: number): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/cities?stateId=${stateId}`
    );
  }

  getLanguages(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/languages`
    );
  }

  getCurrencies(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/currencies`
    );
  }

  getBusinessTypes(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/business-types`
    );
  }

  getIndustryTypes(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/industry-types`
    );
  }

  getTimeZones(countryId: number) {

  return this.http.get<MasterDto[]>(
    `${this.apiUrl}/time-zones?id=${countryId}`
  );

}
}