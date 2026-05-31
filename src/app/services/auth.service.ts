import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../config';

export interface Plan {
  id:             number;
  name:           string;
  description:    string;    // added
  price:          number;
  durationDays:   number;
  maxUsers:       number;
  maxBranches:    number;
  storageLimitGB: number;
  features:       string[];  // added — extra bullet points
  isTrial:        boolean;
  isCustom:       boolean;   // added — Enterprise / Contact Sales tier
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiBaseUrl}/api/Auth`;

  constructor(private http: HttpClient) {}

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(
      `${this.apiUrl}/plans`
    );
  }

  register(data: any) {
    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );
  }

  login(data: any) {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}