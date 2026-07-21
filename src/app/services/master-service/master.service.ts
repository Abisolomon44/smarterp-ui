import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MasterDto } from '../../pages/model-dto/master';
import { environment } from '../../../config';

/**
 * Response structure for save operations
 */
export interface SaveResponse {
  id: number;
  message: string;
}

/**
 * Request interfaces for save operations
 */
export interface SaveCountryRequest {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  isDelete?: boolean;
}

export interface SaveStateRequest {
  id: number;
  name: string;
  code: string;
  countryId: number;
  isActive: boolean;
  isDelete?: boolean;
}

export interface SaveCityRequest {
  id: number;
  name: string;
  code: string;
  stateId: number;
  isActive: boolean;
  isDelete?: boolean;
}

export interface SaveLanguageRequest {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  isDelete?: boolean;
}

export interface SaveCurrencyRequest {
  id: number;
  name: string;
  code: string;
  symbol: string;
  isActive: boolean;
  isDelete?: boolean;
}

export interface SaveBusinessTypeRequest {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  isDelete?: boolean;
}

export interface SaveIndustryTypeRequest {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  isDelete?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = `${environment.apiBaseUrl}/api/Master`;

  constructor(
    private http: HttpClient
  ) { }

  /* ====================================
     GET ENDPOINTS - READ OPERATIONS
     ==================================== */

  /**
   * Fetch all plans
   */
  getPlans(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/plans`
    );
  }

  /**
   * Fetch all countries
   */
  getCountries(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/countries`
    );
  }

  /**
   * Fetch states by country ID
   * @param countryId - Country ID
   */
  getStates(countryId: number): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/states?countryId=${countryId}`
    );
  }

  /**
   * Fetch cities by state ID
   * @param stateId - State ID
   */
  getCities(stateId: number): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/cities?stateId=${stateId}`
    );
  }

  /**
   * Fetch all languages
   */
  getLanguages(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/languages`
    );
  }

  /**
   * Fetch all currencies
   */
  getCurrencies(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/currencies`
    );
  }

  /**
   * Fetch all business types
   */
  getBusinessTypes(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/business-types`
    );
  }

  /**
   * Fetch all industry types
   */
  getIndustryTypes(): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/industry-types`
    );
  }

  /**
   * Fetch time zones by country ID
   * @param countryId - Country ID
   */
  getTimeZones(countryId: number): Observable<MasterDto[]> {
    return this.http.get<MasterDto[]>(
      `${this.apiUrl}/time-zones?id=${countryId}`
    );
  }

  /* ====================================
     SAVE ENDPOINTS - WRITE OPERATIONS
     ==================================== */

  /**
   * Save or delete a country
   * @param request - SaveCountryRequest with country details
   */
  saveCountry(request: SaveCountryRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(
      `${this.apiUrl}/countries/save`,
      request
    );
  }

  /**
   * Save or delete a state
   * @param request - SaveStateRequest with state details
   */
  saveState(request: SaveStateRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(
      `${this.apiUrl}/states/save`,
      request
    );
  }

  /**
   * Save or delete a city
   * @param request - SaveCityRequest with city details
   */
  saveCity(request: SaveCityRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(
      `${this.apiUrl}/cities/save`,
      request
    );
  }

  /**
   * Save or delete a language
   * @param request - SaveLanguageRequest with language details
   */
  saveLanguage(request: SaveLanguageRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(
      `${this.apiUrl}/languages/save`,
      request
    );
  }

  /**
   * Save or delete a currency
   * @param request - SaveCurrencyRequest with currency details
   */
  saveCurrency(request: SaveCurrencyRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(
      `${this.apiUrl}/currencies/save`,
      request
    );
  }

  /**
   * Save or delete a business type
   * @param request - SaveBusinessTypeRequest with business type details
   */
  saveBusinessType(request: SaveBusinessTypeRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(
      `${this.apiUrl}/business-types/save`,
      request
    );
  }

  /**
   * Save or delete an industry type
   * @param request - SaveIndustryTypeRequest with industry type details
   */
  saveIndustryType(request: SaveIndustryTypeRequest): Observable<SaveResponse> {
    return this.http.post<SaveResponse>(
      `${this.apiUrl}/industry-types/save`,
      request
    );
  }
}