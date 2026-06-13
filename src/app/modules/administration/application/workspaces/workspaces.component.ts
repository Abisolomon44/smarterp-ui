import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-workspaces',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.scss']
})
export class WorkspacesComponent implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private alert: AlertService
  ) { }

  workspaces: any[] = [];

  loading = false;

  showEntry = false;

  workspaceModel: any = {
    id: 0,
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

    description: 'Manage application workspaces',

    icon: ICONS.workspace,

    createLabel: 'Create Workspace',

    stats: [],

    columns: [
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
          'name',
          'code'
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
        name: 'name',
        label: 'Workspace Name',
        type: 'text',
        required: true
      },

      {
        name: 'code',
        label: 'Workspace Code',
        type: 'text',
        required: true
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
        type: 'number'
      },

      {
        name: 'isDefault',
        label: 'Default Workspace',
        type: 'toggle'
      }
    ]
  };

  ngOnInit(): void {
    this.loadWorkspaces();
  }

  loadWorkspaces(): void {

    this.loading = true;

    this.administrationService
      .getWorkspaces()
      .subscribe({
        next: (response: any[]) => {

          this.workspaces = response;

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
        label: 'Total Workspaces',
        value: data.length,
        icon: ICONS.workspace,
        description: 'Available workspaces'
      },
      {
        label: 'Default Workspaces',
        value: data.filter(
          x => x.isDefault
        ).length,
        icon: ICONS.activeUsers,
        description: 'Default workspace'
      }
    ];
  }

  createWorkspace(): void {

    this.workspaceModel = {
      id: 0,
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

  editWorkspace(workspace: any): void {

    this.administrationService
      .getWorkspaceById(workspace.id)
      .subscribe({
        next: (response) => {

          this.workspaceModel = response;

          this.showEntry = true;
        }
      });
  }

  saveWorkspace(): void {

    const isUpdate =
      this.workspaceModel.id > 0;

    this.administrationService
      .saveWorkspace(this.workspaceModel)
      .subscribe({
        next: () => {

          this.alert.success(
            isUpdate
              ? 'Workspace updated successfully.'
              : 'Workspace created successfully.'
          );

          this.showEntry = false;

          this.loadWorkspaces();
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
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
      isDelete: true
    };

    this.administrationService
      .saveWorkspace(model)
      .subscribe({
        next: () => {

          this.alert.success(
            'Workspace deleted successfully.'
          );

          this.loadWorkspaces();
        }
      });
  }

  cancel(): void {
    this.showEntry = false;
  }
}