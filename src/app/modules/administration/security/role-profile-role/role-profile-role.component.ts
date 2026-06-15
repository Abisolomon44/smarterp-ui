import { Component, OnInit } from '@angular/core';

import { MasterPageComponent }
from '../../../../shared/master-page/master-page.component';

import { AdministrationService }
from '../../../../services/administration-service/administration.service';

import { AuthService }
from '../../../../services/auth.service';

import { AlertService }
from '../../../../services/alert.service';

import { ICONS }
from '../../../../shared/icon.constants';

@Component({
selector: 'app-role-profile-role',
standalone: true,
imports: [
MasterPageComponent
],
templateUrl: './role-profile-role.component.html',
styleUrls: ['./role-profile-role.component.scss']
})
export class RoleProfileRoleComponent
implements OnInit {

constructor(
private administrationService:
AdministrationService,

private authService:
  AuthService,

private alert:
  AlertService

) { }

companyId =
Number(
localStorage.getItem(
'companyId'
)
);

mappings: any[] = [];

companies: any[] = [];

roleProfiles: any[] = [];

roles: any[] = [];

loading = false;

showEntry = false;

mappingModel: any = {
id: 0,
companyId: null,
roleProfileId: null,
roleId: null,
isDelete: false
};

config: any = {

title:
  'Role Profile Roles',

description:
  'Assign roles to role profiles',

icon:
  ICONS.roles,

createLabel:
  'Assign Role',

stats: [],

columns: [
  {
    field: 'companyName',
    header: 'Company'
  },
  {
    field: 'roleProfileName',
    header: 'Role Profile'
  },
  {
    field: 'roleName',
    header: 'Role'
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
      'roleProfileId',
      'roleId'
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
    name: 'roleProfileId',
    label: 'Role Profile',
    type: 'dropdown',
    required: true,
    options: []
  },
  {
    name: 'roleId',
    label: 'Role',
    type: 'dropdown',
    required: true,
    options: []
  }
]

};

ngOnInit(): void {

this.loadCompanies();

}

loadCompanies(): void {

const userId =
  Number(
    localStorage.getItem(
      'userId'
    )
  );

this.authService
  .getUserCompany(userId)
  .subscribe({
    next: (response: any) => {

      this.companies = [
        {
          value:
            response.companyId,
          label:
            response.companyName
        }
      ];

      const companyField =
        this.config.fields.find(
          (x: any) =>
            x.name === 'companyId'
        );

      if (companyField) {

        companyField.options =
          this.companies;
      }

      this.companyId =
        response.companyId;

      this.mappingModel.companyId =
        response.companyId;

      this.loadRoleProfiles();

      this.loadRoles();

      this.loadMappings();
    },
    error: (error) => {

      console.error(error);
    }
  });

}

loadRoleProfiles(): void {

this.administrationService
  .getRoleProfiles(
    this.companyId
  )
  .subscribe({
    next: (response: any) => {

      const data =
        response.data ??
        response;

      this.roleProfiles =
        data.map(
          (x: any) => ({
            value: x.id,
            label: x.name
          })
        );

      const field =
        this.config.fields.find(
          (x: any) =>
            x.name ===
            'roleProfileId'
        );

      if (field) {

        field.options =
          this.roleProfiles;
      }
    }
  });

}

loadRoles(): void {

this.administrationService
  .getRoles()
  .subscribe({
    next: (response: any) => {

      const data =
        response.data ??
        response;

      this.roles =
        data.map(
          (x: any) => ({
            value: x.id,
            label: x.name
          })
        );

      const field =
        this.config.fields.find(
          (x: any) =>
            x.name ===
            'roleId'
        );

      if (field) {

        field.options =
          this.roles;
      }
    }
  });

}
edit(
  row: any
): void {

  this.mappingModel = {

    id:
      row.id,

    companyId:
      row.companyId,

    roleProfileId:
      row.roleProfileId,

    roleId:
      row.roleId,

    isDelete: false
  };

  this.showEntry = true;
}
loadMappings(): void {

this.loading = true;

this.administrationService
  .getRoleProfileRoles(
    this.companyId
  )
  .subscribe({
    next: (response: any) => {

      this.mappings =
        response.data ??
        response;

      this.updateStats();

      this.loading = false;
    },
    error: (error) => {

      console.error(error);

      this.loading = false;
    }
  });

}

updateStats(): void {

this.config.stats = [
  {
    label:
      'Assignments',

    value:
      this.mappings.length,

    icon:
      ICONS.roles,

    description:
      'Total role assignments'
  },
  {
    label:
      'Profiles',

    value:
      new Set(
        this.mappings.map(
          (x: any) =>
            x.roleProfileName
        )
      ).size,

    icon:
      ICONS.activeUsers,

    description:
      'Configured profiles'
  }
];

}

create(): void {

this.mappingModel = {
  id: 0,
  companyId:
    this.companyId,
  roleProfileId: null,
  roleId: null,
  isDelete: false
};

this.showEntry = true;

}

save(): void {

this.mappingModel.companyId =
  this.companyId;

this.administrationService
  .saveRoleProfileRole(
    this.mappingModel
  )
  .subscribe({
    next: (response: any) => {

      this.alert.success(
        response.message
      );

      this.showEntry = false;

      this.loadMappings();
    },
    error: (error) => {

      this.alert.error(
        error?.error?.message ??
        'Unable to save role assignment.'
      );
    }
  });

}

async delete(
row: any
): Promise<void> {

const confirmed =
  await this.alert.confirm(
    'Remove selected role assignment?'
  );

if (!confirmed) {
  return;
}

const model = {
  ...row,
  companyId:
    this.companyId,
  isDelete: true
};

this.administrationService
  .saveRoleProfileRole(
    model
  )
  .subscribe({
    next: (response: any) => {

      this.alert.success(
        response.message
      );

      this.loadMappings();
    },
    error: (error) => {

      this.alert.error(
        error?.error?.message ??
        'Unable to delete assignment.'
      );
    }
  });

}

cancel(): void {

this.showEntry = false;

}
}
