import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlansComponent } from './pages/plans/plans.component';

import { DefaultLayoutComponent } from './layout/default-layout.component';
import { DashboradComponent } from './pages/dashborad/dashborad.component';

import { WorkspaceComponent } from './pages/administration/workspace/workspace.component';

import { CreateUserComponent } from './pages/users/create-user.component';

import { CompanyMasterComponent } from '../../src/app/modules/organization/company-master/company-master.component';
// Security
import { UsersComponent } from './modules/administration/security/users/users.component';
import { RolesComponent } from './modules/administration/security/roles/roles.component';
import { UserRolesComponent } from './modules/administration/security/user-roles/user-roles.component';
import { RolePermissionsComponent } from './modules/administration/security/role-permissions/role-permissions.component';
import { RoleProfilesComponent } from './modules/administration/security/role-profiles/role-profiles.component';

// Application
import { WorkspacesComponent } from './modules/administration/application/workspaces/workspaces.component';
import { DomainsComponent } from './modules/administration/application/domains/domains.component';
import { ModulesComponent } from './modules/administration/application/modules/modules.component';
import { SubModulesComponent } from './modules/administration/application/sub-modules/sub-modules.component';
import { ModuleProfilesComponent } from './modules/administration/application/module-profiles/module-profiles.component';
import { RoleDomainsComponent } from './modules/administration/mappings/role-domains/role-domains.component';
import { RoleProfileRoleComponent } from './modules/administration/security/role-profile-role/role-profile-role.component';
import { RoleWorkspacesComponent } from './modules/administration/security/role-workspaces/role-workspaces.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'plans',
    component: PlansComponent,
  },

  {
    path: 'dashboard',
    component: DefaultLayoutComponent,

    children: [
      {
        path: '',
        component: DashboradComponent,
      },

      {
        path: 'administration',

        children: [
          {
            path: '',
            component: WorkspaceComponent,
          },

          // ==========================
          // SECURITY DOMAIN
          // ==========================

          {
            path: 'security/users',
            component: UsersComponent,
          },

          {
            path: 'security/users/create',
            component: CreateUserComponent,
          },

          {
            path: 'security/roles',
            component: RolesComponent,
          },

          {
            path: 'security/user-roles',
            component: UserRolesComponent,
          },

          {
            path: 'security/role-permissions',
            component: RolePermissionsComponent,
          },

          {
            path: 'security/role-profiles',
            component: RoleProfilesComponent,
          },
          {
            path: 'security/role-profile-roles',
            component: RoleProfileRoleComponent,
          },

          {
            path: 'security/role-domains',
            component: RoleDomainsComponent,
          },

          {
            path: 'security/role-workspaces',
            component: RoleWorkspacesComponent,
          },

          {
            path: 'security/role-permissions',
            component: RolePermissionsComponent,
          },

          // ==========================
          // APPLICATION DOMAIN
          // ==========================

          {
            path: 'application/workspaces',
            component: WorkspacesComponent,
          },

          {
            path: 'application/domains',
            component: DomainsComponent,
          },

          {
            path: 'application/modules',
            component: ModulesComponent,
          },

          {
            path: 'application/sub-modules',
            component: SubModulesComponent,
          },

          {
            path: 'application/module-profiles',
            component: ModuleProfilesComponent,
          },
        ],
      },

      {
        path: 'oraganization',

        children: [
          {
            path: '',
            component: CompanyMasterComponent,
          },
        ],
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
