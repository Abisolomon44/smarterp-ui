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
  selector: 'app-role-permissions',
  standalone: true,
  imports: [
    MasterPageComponent
  ],
  templateUrl:
    './role-permissions.component.html',
  styleUrls: [
    './role-permissions.component.scss'
  ]
})
export class RolePermissionsComponent
  implements OnInit {

  constructor(
    private administrationService:
      AdministrationService,

    private authService:
      AuthService,

    private alert:
      AlertService
  ) { }

  companyId = 0;

  rolePermissions: any[] = [];

  showEntry = false;

  rolePermissionModel: any = {
    id: 0,
    companyId: null,
    roleId: null,
    subModuleId: null,

    canView: true,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
    canPrint: false,
    canExport: false,

    isDelete: false
  };

  config: any = {

    title: 'Role Permissions',

    description:
      'Manage role based permissions',

    icon:
      ICONS.security,

    createLabel:
      'Create Permission',

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
        field: 'moduleName',
        header: 'Module'
      },
      {
        field: 'subModuleName',
        header: 'Sub Module'
      },
      {
        field: 'canView',
        header: 'View'
      },
      {
        field: 'canCreate',
        header: 'Create'
      },
      {
        field: 'canEdit',
        header: 'Edit'
      },
      {
        field: 'canDelete',
        header: 'Delete'
      }
    ],

    tabs: [
      {
        name: 'General',
        fields: [
          'companyId',
          'roleId',
          'subModuleId'
        ]
      },
      {
        name: 'Permissions',
        fields: [
          'canView',
          'canCreate',
          'canEdit',
          'canDelete',
          'canApprove',
          'canPrint',
          'canExport'
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
        name: 'subModuleId',
        label: 'Sub Module',
        type: 'dropdown',
        required: true,
        options: []
      },
      {
        name: 'canView',
        label: 'View',
        type: 'checkbox'
      },
      {
        name: 'canCreate',
        label: 'Create',
        type: 'checkbox'
      },
      {
        name: 'canEdit',
        label: 'Edit',
        type: 'checkbox'
      },
      {
        name: 'canDelete',
        label: 'Delete',
        type: 'checkbox'
      },
      {
        name: 'canApprove',
        label: 'Approve',
        type: 'checkbox'
      },
      {
        name: 'canPrint',
        label: 'Print',
        type: 'checkbox'
      },
      {
        name: 'canExport',
        label: 'Export',
        type: 'checkbox'
      }
    ]
  };

  ngOnInit(): void {

    this.loadCompany();
  }

  loadCompany(): void {

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

          this.companyId =
            response.companyId;

          const companyField =
            this.config.fields.find(
              (x: any) =>
                x.name === 'companyId'
            );

          if (companyField) {

            companyField.options = [
              {
                value: response.companyId,
                label: response.companyName
              }
            ];
          }

          this.rolePermissionModel.companyId =
            response.companyId;

          this.loadRoles();

          this.loadSubModules();

          this.loadRolePermissions();
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

          const field =
            this.config.fields.find(
              (x: any) =>
                x.name === 'roleId'
            );

          if (field) {

            field.options =
              data.map(
                (x: any) => ({
                  value: x.id,
                  label: x.name
                })
              );
          }
        }
      });
  }

  loadSubModules(): void {

    this.administrationService
      .getSubModules(
        this.companyId
      )
      .subscribe({
        next: (response: any) => {

          const data =
            response.data ??
            response;

          const field =
            this.config.fields.find(
              (x: any) =>
                x.name === 'subModuleId'
            );

          if (field) {

            field.options =
              data.map(
                (x: any) => ({
                  value: x.id,
                  label:
                    `${x.moduleName} - ${x.name}`
                })
              );
          }
        }
      });
  }

  loadRolePermissions(): void {

    this.administrationService
      .getRolePermissions(
        this.companyId
      )
      .subscribe({
        next: (response: any) => {

          this.rolePermissions =
            response.data ??
            response;

          this.config.stats = [
            {
              label:
                'Permissions',

              value:
                this.rolePermissions.length,

              icon:
                ICONS.security,

              description:
                'Role permissions configured'
            }
          ];
        }
      });
  }

  createPermission(): void {

    this.rolePermissionModel = {
      id: 0,
      companyId:
        this.companyId,

      roleId: null,
      subModuleId: null,

      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      canPrint: false,
      canExport: false,

      isDelete: false
    };

    this.showEntry = true;
  }

  editPermission(
    item: any
  ): void {

    this.rolePermissionModel =
      { ...item };

    this.showEntry = true;
  }

  savePermission(): void {

    this.rolePermissionModel.companyId =
      this.companyId;

    this.administrationService
      .saveRolePermission(
        this.rolePermissionModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadRolePermissions();
        }
      });
  }

  async deletePermission(
    item: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected permission?'
      );

    if (!confirmed) {
      return;
    }

    this.administrationService
      .saveRolePermission({
        ...item,
        companyId:
          this.companyId,
        isDelete: true
      })
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadRolePermissions();
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}