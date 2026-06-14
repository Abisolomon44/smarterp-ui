import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  private apiUrl = `${environment.apiBaseUrl}/api/Administration`;

  constructor(private http: HttpClient) {}

  getAdminDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admindashboard`);
  }
  // =====================================================
  // ROLE
  // =====================================================

  saveRole(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/role`, model);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/role/${id}`);
  }

  // =====================================================
  // USER ROLE
  // =====================================================

  saveUserRole(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-role`, model);
  }

  getUserRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user-roles`);
  }

  getUserRoleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-role/${id}`);
  }

  // =====================================================
  // ROLE PROFILE
  // =====================================================

  saveRoleProfile(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/role-profile`, model);
  }

  getRoleProfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role-profiles`);
  }

  getRoleProfileById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/role-profile/${id}`);
  }

  // =====================================================
  // MODULE
  // =====================================================

  saveModule(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/module`, model);
  }

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules`);
  }

  getModuleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/module/${id}`);
  }

  // =====================================================
  // SUB MODULE
  // =====================================================

  saveSubModule(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sub-module`, model);
  }

  getSubModules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sub-modules`);
  }

  getSubModuleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/sub-module/${id}`);
  }

  // =====================================================
  // MODULE PROFILE
  // =====================================================

  saveModuleProfile(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/module-profile`, model);
  }

  getModuleProfiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/module-profiles`);
  }

  getModuleProfileById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/module-profile/${id}`);
  }

  // =====================================================
  // WORKSPACE
  // =====================================================

  saveWorkspace(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/workspace`, model);
  }

  getWorkspaces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/workspaces`);
  }

  getWorkspaceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/workspace/${id}`);
  }

  // =====================================================
  // DOMAIN
  // =====================================================

  saveDomain(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/domain`, model);
  }

  getDomains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domains`);
  }

  getDomainById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/domain/${id}`);
  }

  // =====================================================
  // ROLE PERMISSION
  // =====================================================

  saveRolePermission(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/role-permission`, model);
  }

  getRolePermissions(roleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role-permissions/${roleId}`);
  }

  // =====================================================
  // SIDEBAR
  // =====================================================

  getSidebar(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sidebar/${userId}`);
  }
  getSidebarWorkspaces(userId: number) {
    return this.http.get(
      `${this.apiUrl}/sidebar-workspaces/${userId}`,
    );
  }

  getRoleDomains(
  roleId: number
) {

  return this.http.get<any>(
    `${this.apiUrl}/role-domains/${roleId}`
  );
}

  saveRoleDomain(
    model: any
  ) {

    return this.http.post(
      `${this.apiUrl}/role-domains`,
      model
    );
  }
}
