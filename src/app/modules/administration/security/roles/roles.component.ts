import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

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
    private alert: AlertService
  ) { }

  roles: any[] = [];

  loading = false;

  showEntry = false;

  roleModel: any = {
    id: 0,
    name: '',
    code: '',
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
        field: 'description',
        header: 'Description'
      },
      {
        field: 'isDefault',
        header: 'Default'
      }
    ],

    tabs: [
      {
        name: 'General',
        fields: [
          'name',
          'code',
          'description'
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
        name: 'name',
        label: 'Role Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'Role Code',
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
  }

  loadRoles(): void {

    this.loading = true;

    this.administrationService
      .getRoles()
      .subscribe({
        next: (response: any[]) => {

          this.roles = response;

          this.updateStats(response);

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.loading = false;
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
      name: '',
      code: '',
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
        next: (response) => {

          this.roleModel = response;

          this.showEntry = true;
        }
      });
  }

  saveRole(): void {

    const isUpdate =
      this.roleModel.id > 0;

    this.administrationService
      .saveRole(this.roleModel)
      .subscribe({
        next: () => {

          this.alert.success(
            isUpdate
              ? 'Role updated successfully.'
              : 'Role created successfully.'
          );

          this.showEntry = false;

          this.loadRoles();
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
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
      isDelete: true
    };

    this.administrationService
      .saveRole(model)
      .subscribe({
        next: () => {

          this.alert.success(
            'Role deleted successfully.'
          );

          this.loadRoles();
        }
      });
  }

  cancel(): void {
    this.showEntry = false;
  }
}