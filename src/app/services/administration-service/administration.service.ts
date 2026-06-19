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
  // ROLE DOMAIN
  // =====================================================

  saveRoleDomain(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/role-domain`, model);
  }

  getRoleDomains(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role-domains/${companyId}`);
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

  getRoleProfiles(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role-profiles/${companyId}`);
  }

  getRoleProfileById(companyId: number, id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/role-profile/${companyId}/${id}`);
  }
  saveRoleProfileRole(model: any) {
    return this.http.post(`${this.apiUrl}/role-profile-role`, model);
  }

  getRoleProfileRoles(companyId: number) {
    return this.http.get(`${this.apiUrl}/role-profile-roles/${companyId}`);
  }
  // =====================================================
  // MODULE
  // =====================================================


getModules(): Observable<any> {

  const companyId =
    Number(
      localStorage.getItem(
        'companyId'
      )
    );

  return this.http.get<any>(
    `${this.apiUrl}/modules/${companyId}`
  );
}

  getModulesByCompanyId(
  companyId: number
): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/modules/${companyId}`
  );
}

getModuleById(
  id: number
): Observable<any> {
  return this.http.get<any>(
    `${this.apiUrl}/module/${id}`
  );
}

saveModule(
  model: any
): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/module`,
    model
  );
}
  

  // =====================================================
  // SUB MODULE
  // =====================================================
  saveSubModule(model: any) {
    return this.http.post(`${this.apiUrl}/sub-module`, model);
  }

  getSubModuleById(id: number) {
    return this.http.get(`${this.apiUrl}/sub-module/${id}`);
  }

  getSubModules(companyId: number) {
    return this.http.get<any>(`${this.apiUrl}/sub-modules/${companyId}`);
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
saveRolePermission(model: any) {
  return this.http.post(
    `${this.apiUrl}/role-permission`,
    model
  );
}

getRolePermissions(
  companyId: number
) {
  return this.http.get(
    `${this.apiUrl}/role-permissions/${companyId}`
  );
}

getRolePermissionById(
  id: number
) {
  return this.http.get(
    `${this.apiUrl}/role-permission/${id}`
  );
}



  // =====================================================
  // SIDEBAR
  // =====================================================

  getSidebar(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sidebar/${userId}`);
  }
  getSidebarWorkspaces(userId: number) {
    return this.http.get(`${this.apiUrl}/sidebar-workspaces/${userId}`);
  }
  // =====================================================
  // ROLE WORKSPACE
  // =====================================================

  saveRoleWorkspace(model: any) {
    return this.http.post(`${this.apiUrl}/role-workspace`, model);
  }

  getRoleWorkspaces(companyId: number) {
    return this.http.get(`${this.apiUrl}/role-workspaces/${companyId}`);
  }
  saveModuleProfileModule(model: any) {
    return this.http.post(`${this.apiUrl}/module-profile-module`, model);
  }

  getModuleProfileModules(companyId: number) {
    return this.http.get(`${this.apiUrl}/module-profile-modules/${companyId}`);
  }
}
