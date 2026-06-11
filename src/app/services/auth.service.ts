import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../config';

export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  maxUsers: number;
  maxBranches: number;
  storageLimitGB: number;
  features: string[];
  isTrial: boolean;
  isCustom: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    `${environment.apiBaseUrl}/api/Auth`;

  constructor(
    private http: HttpClient
  ) { }

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

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      data
    ).pipe(

      tap(response => {

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'userId',
          response.userId.toString()
        );

        localStorage.setItem(
          'companyId',
          response.companyId.toString()
        );

        localStorage.setItem(
          'userName',
          response.userName
        );

      })

    );

  }

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'userId'
    );

    localStorage.removeItem(
      'companyId'
    );

    localStorage.removeItem(
      'userName'
    );

    localStorage.removeItem(
      'selectedPlan'
    );

    sessionStorage.clear();

  }

}