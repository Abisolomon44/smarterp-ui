import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';
import { AuthService } from '../../../../services/auth.service';
import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
selector: 'app-roles',
standalone: true,
imports: [MasterPageComponent],
templateUrl: './roles.component.html',
styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

constructor(
private administrationService: AdministrationService,
private authService: AuthService,
private alert: AlertService
) { }

companyId = Number(
localStorage.getItem('companyId')
);

roles: any[] = [];
companies: any[] = [];

loading = false;

showEntry = false;
roleModel: any = {
  id: 0,
  companyId: null,
  name: '',
  description: '',
  isDefault: false,
  isDelete: false
};

config: any = {
title: 'Roles',

description: 'Manage application roles',

icon: ICONS.roles,

createLabel: 'Create Role',

stats: [],

columns: [
  {
    field: 'name',
    header: 'Role Name'
  },
  {
    field: 'code',
    header: 'Code'
  },

  {
    field: 'isActive',
    header: 'Active'
  }
],

tabs: [
  {
    name: 'General',
    fields: [
      'companyId',
      'name',
    ]
  },
  {
    name: 'Settings',
    fields: [
      'isDefault'
    ]
  }
],

fields: [
{
  name: 'companyId',
  label: 'Company',
  type: 'dropdown',
  required: true,
  options: []
},
{
  name: 'name',
  label: 'Role Name',
  type: 'text',
  required: true
},  
  {
    name: 'description',
    label: 'Description',
    type: 'textarea'
  },
  {
    name: 'isDefault',
    label: 'Default Role',
    type: 'toggle'
  }
]

};

ngOnInit(): void {
this.loadRoles();
this.loadCompanies();
}

loadRoles(): void {

this.loading = true;

this.administrationService
  .getRoles()
  .subscribe({
    next: (response: any) => {

      this.roles =
        response.data ?? response;

      this.updateStats(
        this.roles
      );

      this.loading = false;
    },
    error: (error) => {

      console.error(error);

      this.loading = false;
    }
  });

}

loadCompanies(): void {

  const userId =
    Number(localStorage.getItem('userId'));

  this.authService
    .getUserCompany(userId)
    .subscribe({
      next: (response: any) => {

        this.companies = [
          {
            value: response.companyId,
            label: response.companyName
          }
        ];

        const companyField =
          this.config.fields.find(
            (x: any) => x.name === 'companyId'
          );

        if (companyField) {
          companyField.options =
            this.companies;
        }
      }
    });
}


















updateStats(data: any[]): void {

this.config.stats = [
  {
    label: 'Total Roles',
    value: data.length,
    icon: ICONS.roles,
    description: 'Available roles'
  },
  {
    label: 'Default Roles',
    value: data.filter(
      x => x.isDefault
    ).length,
    icon: ICONS.activeUsers,
    description: 'Default assignments'
  }
];

}

createRole(): void {

this.roleModel = {
  id: 0,
  companyId: this.companyId,
  name: '',
  description: '',
  isDefault: false,
  isDelete: false
};

this.showEntry = true;

}

editRole(role: any): void {

this.administrationService
  .getRoleById(role.id)
  .subscribe({
    next: (response: any) => {

      this.roleModel =
        response.data ?? response;

      this.showEntry = true;
    }
  });

}

saveRole(): void {

this.roleModel.companyId =
  this.companyId;

this.administrationService
  .saveRole(this.roleModel)
  .subscribe({
    next: (response: any) => {

      this.alert.success(
        response.message
      );

      this.showEntry = false;

      this.loadRoles();
    },
    error: (error) => {

      this.alert.error(
        error?.error?.message ??
        'Unable to save role.'
      );
    }
  });

}

async deleteRole(
role: any
): Promise<void> {

const confirmed =
  await this.alert.confirm(
    'Delete selected role?'
  );

if (!confirmed) {
  return;
}

const model = {
  ...role,
  companyId: this.companyId,
  isDelete: true
};

this.administrationService
  .saveRole(model)
  .subscribe({
    next: (response: any) => {

      this.alert.success(
        response.message
      );

      this.loadRoles();
    },
    error: (error) => {

      this.alert.error(
        error?.error?.message ??
        'Unable to delete role.'
      );
    }
  });

}

cancel(): void {
this.showEntry = false;
}
}
