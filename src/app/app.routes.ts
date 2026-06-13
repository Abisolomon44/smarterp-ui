import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlansComponent } from './pages/plans/plans.component';

import { DefaultLayoutComponent } from './layout/default-layout.component';

import { DashboradComponent } from './pages/dashborad/dashborad.component';

import { WorkspaceComponent } from './pages/administration/workspace/workspace.component';

import { CreateUserComponent } from './pages/users/create-user.component';

// Administration Masters
import { UsersComponent } from '../app/modules/administration/security/users/users.component';
import { RolesComponent } from '../app/modules/administration/security/roles/roles.component';
import { RoleProfilesComponent } from '../app/modules/administration/security/role-profiles/role-profiles.component';

import { WorkspacesComponent } from '../app/modules/administration/application/workspaces/workspaces.component';
import { DomainsComponent } from '../app/modules/administration/application/domains/domains.component';

import { ModulesComponent } from '../app/modules/administration/application/modules/modules.component';
import { SubModulesComponent } from '../app/modules/administration/application/sub-modules/sub-modules.component';
import { RolePermissionsComponent } from '../app/modules/administration/security/role-permissions/role-permissions.component';
import { UserRolesComponent } from '../app/modules/administration/security/user-roles/user-roles.component';
import { ModuleProfilesComponent } from './modules/administration/application/module-profiles/module-profiles.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'plans',
    component: PlansComponent
  },

  {
    path: 'dashboard',
    component: DefaultLayoutComponent,

    children: [

      {
        path: '',
        component: DashboradComponent
      },

      {
        path: 'administration',

        children: [

          // Dashboard
          {
            path: '',
            component: WorkspaceComponent
          },

          // Users
          {
            path: 'users',
            component: UsersComponent
          },

          {
            path: 'users/create',
            component: CreateUserComponent
          },

          // Roles
          {
            path: 'roles',
            component: RolesComponent
          },

          // Role Profiles
          {
            path: 'role-profiles',
            component: RoleProfilesComponent
          },

          // Workspaces
          {
            path: 'workspaces',
            component: WorkspacesComponent
          },

          // Domains
          {
            path: 'domains',
            component: DomainsComponent
          },

          // Modules
          {
            path: 'modules',
            component: ModulesComponent
          },

          // Sub Modules
          {
            path: 'sub-modules',
            component: SubModulesComponent
          },

             // Sub Modules
          {
            path: 'module-profiles',
            component: ModuleProfilesComponent
          },
          // Permissions
          {
            path: 'permissions',
            component: RolePermissionsComponent
          },

          // User Roles
          {
            path: 'user-roles',
            component: UserRolesComponent
          },

          // User Workspaces
          {
            path: 'user-workspaces',
            component: RolePermissionsComponent
          }
        ]
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];