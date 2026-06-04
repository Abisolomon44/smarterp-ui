import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../config';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiBaseUrl}/api/Auth`;

  constructor(
    private http: HttpClient
  ) { }

  saveUser(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/user/save`,
      data
    );
  }

  getUserById(id: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/user/${id}`
    );
  }

  getUsers(companyId: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/user/list/${companyId}`
    );
  }

  deleteUser(id: number): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/user/save`,
      {
        id: id,
        isDelete: true
      }
    );
  }
}