import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { AuthService } from '../../../../services/auth.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-workspaces',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss']
})
export class WorkspacesComponent
  implements OnInit {

  constructor(
    private administrationService:
      AdministrationService,
    private authService:
      AuthService,
    private alert:
      AlertService
  ) { }

  companyId = Number(
    localStorage.getItem('companyId')
  );

  workspaces: any[] = [];

  loading = false;

  showEntry = false;

  workspaceModel: any = {
    id: 0,
    companyId: this.companyId,
    name: '',
    code: '',
    icon: '',
    routeUrl: '',
    sortOrder: 1,
    isDefault: false,
    isDelete: false
  };

  config: any = {

    title: 'Workspaces',

    description:
      'Manage application workspaces',

    icon: ICONS.workspace,

    createLabel:
      'Create Workspace',

    stats: [],

    columns: [
      {
        field: 'companyName',
        header: 'Company'
      },
      {
        field: 'name',
        header: 'Workspace Name'
      },
      {
        field: 'code',
        header: 'Code'
      },
      {
        field: 'routeUrl',
        header: 'Route'
      },
      {
        field: 'sortOrder',
        header: 'Sort Order'
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
          'companyId',
          'name'
        ]
      },
      {
        name: 'Navigation',
        fields: [
          'icon',
          'routeUrl',
          'sortOrder'
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
        label: 'Workspace Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'Workspace Code',
        type: 'text',
        readonly: true
      },
      {
        name: 'icon',
        label: 'Icon',
        type: 'text'
      },
      {
        name: 'routeUrl',
        label: 'Route URL',
        type: 'text'
      },
      {
        name: 'sortOrder',
        label: 'Sort Order',
        type: 'text',
      },
      {
        name: 'isDefault',
        label: 'Default Workspace',
        type: 'toggle'
      }
    ]
  };

  ngOnInit(): void {

    this.loadCompany();

    this.loadWorkspaces();
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

          this.companyId =
            response.companyId;

          this.workspaceModel.companyId =
            response.companyId;
        }
      });
  }

  loadWorkspaces(): void {

    this.loading = true;

    this.administrationService
      .getWorkspaces()
      .subscribe({
        next: (response: any) => {

          this.workspaces =
            response.data ?? response;

          this.updateStats(
            this.workspaces
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
        label: 'Total Workspaces',
        value: data.length,
        icon: ICONS.workspace,
        description:
          'Available workspaces'
      },
      {
        label: 'Default Workspaces',
        value: data.filter(
          x => x.isDefault
        ).length,
        icon: ICONS.activeUsers,
        description:
          'Default workspace'
      }
    ];
  }

  createWorkspace(): void {

    this.workspaceModel = {
      id: 0,
      companyId: this.companyId,
      name: '',
      code: '',
      icon: '',
      routeUrl: '',
      sortOrder: 1,
      isDefault: false,
      isDelete: false
    };

    this.showEntry = true;
  }

  editWorkspace(
    workspace: any
  ): void {

    this.administrationService
      .getWorkspaceById(
        workspace.id
      )
      .subscribe({
        next: (response: any) => {

          this.workspaceModel =
            response.data ?? response;

          this.showEntry = true;
        }
      });
  }

  saveWorkspace(): void {

    this.workspaceModel.companyId =
      this.companyId;

    this.administrationService
      .saveWorkspace(
        this.workspaceModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadWorkspaces();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save workspace.'
          );
        }
      });
  }

  async deleteWorkspace(
    workspace: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected workspace?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...workspace,
      companyId: this.companyId,
      isDelete: true
    };

    this.administrationService
      .saveWorkspace(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadWorkspaces();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete workspace.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}