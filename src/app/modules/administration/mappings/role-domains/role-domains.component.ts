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

  roleDomains: any[] = [];

  roles: any[] = [];

  domains: any[] = [];

  loading = false;

  showEntry = false;

  selectedRoleId = 0;

  roleDomainModel: any = {
    id: 0,
    roleId: null,
    domainId: null,
    isDelete: false
  };

  constructor(
    private administrationService:
      AdministrationService,
    private alert:
      AlertService
  ) { }

  config: any = {

    title: 'Role Domains',

    description:
      'Manage role domain mappings',

    icon: ICONS.roleDomains,

    createLabel:
      'Assign Domain',

    stats: [],

    columns: [

      {
        field: 'workspaceName',
        header: 'Workspace'
      },

      {
        field: 'name',
        header: 'Domain'
      },

      {
        field: 'code',
        header: 'Code'
      }
    ],

    tabs: [
      {
        name: 'General',
        fields: [
          'roleId',
          'domainId'
        ]
      }
    ],

    fields: [

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

    this.loadRoles();

    this.loadDomains();
  }

  loadRoles(): void {

    this.administrationService
      .getRoles()
      .subscribe({
        next: (response: any) => {

          this.roles =
            response.data ?? response;

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

          if (this.roles.length > 0) {

            this.selectedRoleId =
              this.roles[0].id;

            this.roleDomainModel.roleId =
              this.selectedRoleId;

            this.loadRoleDomains();
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
            response.data ?? response;

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
  }loadRoleDomains(): void {

  if (!this.selectedRoleId) {
    return;
  }

  this.loading = true;

  this.administrationService
    .getRoleDomains(
      this.selectedRoleId
    )
    .subscribe({
      next: (response: any) => {

        this.roleDomains =
          response.data ?? response;

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

      roleId:
        this.selectedRoleId,

      domainId: null,

      isDelete: false
    };

    this.showEntry = true;
  }
saveRoleDomain(): void {

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

    id: item.id,

    roleId:
      this.selectedRoleId,

    domainId:
      item.id,

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


editRoleDomain(
  item: any
): void {

  this.roleDomainModel = {

    id: item.id,

    roleId:
      this.selectedRoleId,

    domainId:
      item.id,

    isDelete: false
  };

  this.showEntry = true;
}

  cancel(): void {

    this.showEntry = false;
  }
}