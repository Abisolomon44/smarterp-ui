import {
Component,
OnInit
} from '@angular/core';

import {
MasterPageComponent
} from '../../../../shared/master-page/master-page.component';

import {
AdministrationService
} from '../../../../services/administration-service/administration.service';

import {
AuthService
} from '../../../../services/auth.service';

import {
AlertService
} from '../../../../services/alert.service';

import {
ICONS
} from '../../../../shared/icon.constants';

@Component({
selector: 'app-role-domains',
standalone: true,
imports: [
MasterPageComponent
],
templateUrl:
'./role-domains.component.html',
styleUrls: [
'./role-domains.component.scss'
]
})
export class RoleDomainsComponent
implements OnInit {

companyId = Number(
localStorage.getItem(
'companyId'
)
);

roleDomains: any[] = [];

companies: any[] = [];

roles: any[] = [];

domains: any[] = [];

loading = false;

showEntry = false;

roleDomainModel: any = {
id: 0,
companyId: null,
roleId: null,
domainId: null,
isDelete: false
};

constructor(
private administrationService:
AdministrationService,

private authService:
  AuthService,

private alert:
  AlertService

) { }

config: any = {

title:
  'Role Domains',

description:
  'Manage role domain mappings',

icon:
  ICONS.roleDomains,

createLabel:
  'Assign Domain',

stats: [],

columns: [
  {
    field: 'companyName',
    header: 'Company'
  },
  {
    field: 'roleName',
    header: 'Role'
  },
  {
    field: 'workspaceName',
    header: 'Workspace'
  },
  {
    field: 'domainName',
    header: 'Domain'
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
      'roleId',
      'domainId'
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
    name: 'roleId',
    label: 'Role',
    type: 'dropdown',
    required: true,
    options: []
  },
  {
    name: 'domainId',
    label: 'Domain',
    type: 'dropdown',
    required: true,
    options: []
  }
]

};

ngOnInit(): void {

this.loadCompanies();

this.loadRoles();

this.loadDomains();

this.loadRoleDomains();

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

      const field =
        this.config.fields.find(
          (x: any) =>
            x.name === 'companyId'
        );

      if (field) {

        field.options =
          this.companies;
      }

      this.roleDomainModel.companyId =
        response.companyId;
    }
  });

}

loadRoles(): void {

this.administrationService
  .getRoles()
  .subscribe({
    next: (response: any) => {

      this.roles =
        response.data ??
        response;

      const field =
        this.config.fields.find(
          (x: any) =>
            x.name === 'roleId'
        );

      if (field) {

        field.options =
          this.roles.map(
            (x: any) => ({
              value: x.id,
              label: x.name
            })
          );
      }
    }
  });

}

loadDomains(): void {

this.administrationService
  .getDomains()
  .subscribe({
    next: (response: any) => {

      this.domains =
        response.data ??
        response;

      const field =
        this.config.fields.find(
          (x: any) =>
            x.name === 'domainId'
        );

      if (field) {

        field.options =
          this.domains.map(
            (x: any) => ({
              value: x.id,
              label: x.name
            })
          );
      }
    }
  });

}

loadRoleDomains(): void {

this.loading = true;

this.administrationService
  .getRoleDomains(
    this.companyId
  )
  .subscribe({
    next: (response: any) => {

      this.roleDomains =
        response.data ??
        response;

      this.updateStats(
        this.roleDomains
      );

      this.loading = false;
    },
    error: (error) => {

      console.error(error);

      this.loading = false;
    }
  });

}

updateStats(
data: any[]
): void {

this.config.stats = [
  {
    label:
      'Assigned Domains',

    value:
      data.length,

    icon:
      ICONS.roleDomains,

    description:
      'Role domain mappings'
  }
];

}

createRoleDomain(): void {

this.roleDomainModel = {

  id: 0,

  companyId:
    this.companyId,

  roleId: null,

  domainId: null,

  isDelete: false
};

this.showEntry = true;

}

editRoleDomain(
item: any
): void {

this.roleDomainModel = {

  id:
    item.id,

  companyId:
    item.companyId,

  roleId:
    item.roleId,

  domainId:
    item.domainId,

  isDelete: false
};

this.showEntry = true;

}

saveRoleDomain(): void {

this.roleDomainModel.companyId =
  this.companyId;

this.administrationService
  .saveRoleDomain(
    this.roleDomainModel
  )
  .subscribe({
    next: (response: any) => {

      this.alert.success(
        response.message ??
        'Role domain saved successfully.'
      );

      this.showEntry = false;

      this.loadRoleDomains();
    },
    error: (error) => {

      this.alert.error(
        error?.error?.message ??
        'Unable to save role domain.'
      );
    }
  });

}

async deleteRoleDomain(
item: any
): Promise<void> {

const confirmed =
  await this.alert.confirm(
    'Delete selected mapping?'
  );

if (!confirmed) {
  return;
}

const model = {

  id:
    item.id,

  companyId:
    item.companyId,

  roleId:
    item.roleId,

  domainId:
    item.domainId,

  isDelete: true
};

this.administrationService
  .saveRoleDomain(
    model
  )
  .subscribe({
    next: (response: any) => {

      this.alert.success(
        response.message ??
        'Role domain removed.'
      );

      this.loadRoleDomains();
    },
    error: (error) => {

      this.alert.error(
        error?.error?.message ??
        'Unable to delete mapping.'
      );
    }
  });

}

cancel(): void {

this.showEntry = false;

}
}
