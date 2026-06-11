import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =
    `${environment.apiBaseUrl}/api/Auth`;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // SAVE USER
  // ==========================

  saveUser(
    data: any
  ): Observable<number> {

    return this.http.post<number>(
      `${this.apiUrl}/user/save`,
      data
    );

  }

  // ==========================
  // GET USER BY ID
  // ==========================

  getUserById(
    id: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/user/${id}`
    );

  }

  // ==========================
  // GET USERS BY COMPANY
  // ==========================

  getUsers(
    companyId: number
  ): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/users/${companyId}`
    );

  }

  // ==========================
  // DELETE USER
  // ==========================

  deleteUser(
    id: number
  ): Observable<number> {

    return this.http.post<number>(
      `${this.apiUrl}/user/save`,
      {
        id,
        isDelete: true
      }
    );

  }

}