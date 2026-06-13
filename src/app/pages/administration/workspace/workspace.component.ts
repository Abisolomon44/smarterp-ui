import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  LucideAngularModule
} from 'lucide-angular';

import { ICONS }
from '../../../shared/icon.constants';

import { AdministrationService }
from '../../../services/administration-service/administration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceComponent implements OnInit {

  readonly icons = ICONS;

  dashboard: any;

  cards = [
    {
      title: 'Users',
      description: 'Manage system users and access',
      icon: ICONS.users,
      iconClass: 'users',
      route: '/dashboard/administration/users'
    },
        {
      title: 'Users Roles',
      description: 'Manage system users and access',
      icon: ICONS.users,
      iconClass: 'users',
      route: '/dashboard/administration/users'
    },
    {
      title: 'Roles',
      description: 'Manage user roles and hierarchy',
      icon: ICONS.roles,
      iconClass: 'roles',
      route: '/dashboard/administration/roles'
    },
    {
      title: 'Permissions',
      description: 'Manage role permissions',
      icon: ICONS.permissions,
      iconClass: 'permissions',
      route: '/dashboard/administration/permissions'
    },
    {
      title: 'Workspaces',
      description: 'Manage ERP workspaces',
      icon: ICONS.workspaces,
      iconClass: 'workspace',
      route: '/dashboard/administration/workspaces'
    },
    {
      title: 'Domains',
      description: 'Manage business domains',
      icon: ICONS.domains,
      iconClass: 'domain',
      route: '/dashboard/administration/domains'
    },
    {
      title: 'Modules',
      description: 'Manage application modules',
      icon: ICONS.modules,
      iconClass: 'module',
      route: '/dashboard/administration/modules'
    },
    {
      title: 'Sub Modules',
      description: 'Manage application sub modules',
      icon: ICONS.subModules,
      iconClass: 'submodule',
      route: '/dashboard/administration/sub-modules'
    }
  ];

  constructor(
    private administrationService: AdministrationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  loadDashboard(): void {

    this.administrationService
      .getAdminDashboard()
      .subscribe({
        next: (response) => {
          this.dashboard = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  securityCards = [
  {
    title: 'Users',
    description: 'Manage system users',
    icon: ICONS.users,
    iconClass: 'users',
    route: '/dashboard/administration/users'
  },
  {
    title: 'Roles',
    description: 'Manage roles',
    icon: ICONS.roles,
    iconClass: 'roles',
    route: '/dashboard/administration/roles'
  },
    {
    title: ' User Roles',
    description: 'Manage User Roles',
    icon: ICONS.roles,
    iconClass: 'roles',
    route: '/dashboard/administration/user-roles'
  },
  {
    title: 'Permissions',
    description: 'Manage permissions',
    icon: ICONS.permissions,
    iconClass: 'permissions',
    route: '/dashboard/administration/permissions'
  }
];

organizationCards = [
  {
    title: 'Workspaces',
    description: 'Manage ERP workspaces',
    icon: ICONS.workspaces,
    iconClass: 'workspace',
    route: '/dashboard/administration/workspaces'
  },
  {
    title: 'Domains',
    description: 'Manage domains',
    icon: ICONS.domains,
    iconClass: 'domain',
    route: '/dashboard/administration/domains'
  }
];

navigationCards = [
  {
    title: 'Modules',
    description: 'Manage modules',
    icon: ICONS.modules,
    iconClass: 'module',
    route: '/dashboard/administration/modules'
  },
  {
    title: 'Sub Modules',
    description: 'Manage sub modules',
    icon: ICONS.subModules,
    iconClass: 'submodule',
    route: '/dashboard/administration/sub-modules'
  }
];

configurationCards = [
  {
    title: 'Module Profiles',
    description: 'Manage module profiles',
    icon: ICONS.modules,
    iconClass: 'module',
    route: '/dashboard/administration/module-profiles'
  }
];
}