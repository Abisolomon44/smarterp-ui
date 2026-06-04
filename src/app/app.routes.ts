import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PlansComponent } from './pages/plans/plans.component';
import { DefaultLayoutComponent } from './layout/default-layout.component';
import { DashboradComponent } from './pages/dashborad/dashborad.component';
import { CreateUserComponent } from './pages/users/create-user.component';
import{WorkspaceComponent} from './pages/administration/workspace/workspace.component';

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
      component: DashboradComponent
    },

    {
      path: 'administration',
      children: [

        {
          path: '',
          component: WorkspaceComponent
        },

  

        {
          path: 'users/create',
          component: CreateUserComponent
        },


      ]
    }

  ]
},

  {
    path: '**',
    redirectTo: 'login',
  },
];
