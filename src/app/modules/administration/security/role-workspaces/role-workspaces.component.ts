import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { AuthService } from '../../../../services/auth.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-role-workspaces',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './role-workspaces.component.html',
  styleUrls: ['./role-workspaces.component.scss'],
})
export class RoleWorkspacesComponent implements OnInit {
  companyId = Number(localStorage.getItem('companyId'));

  mappings: any[] = [];

  companies: any[] = [];

  roles: any[] = [];

  workspaces: any[] = [];

  loading = false;

  showEntry = false;

  mappingModel: any = {
    id: 0,
    companyId: null,
    roleId: null,
    workspaceId: null,
    isDelete: false,
  };

  constructor(
    private administrationService: AdministrationService,

    private authService: AuthService,

    private alert: AlertService,
  ) {}

  config: any = {
    title: 'Role Workspaces',
    permissionName: 'Role Workspace List',

    description: 'Assign workspaces to roles',

    icon: ICONS.workspaces,

    createLabel: 'Assign Workspace',

    stats: [],

    columns: [
      {
        field: 'companyName',
        header: 'Company',
      },
      {
        field: 'roleName',
        header: 'Role',
      },
      {
        field: 'workspaceName',
        header: 'Workspace',
      },
      {
        field: 'isActive',
        header: 'Active',
      },
    ],

    tabs: [
      {
        name: 'General',
        fields: ['companyId', 'roleId', 'workspaceId'],
      },
    ],

    fields: [
      {
        name: 'companyId',
        label: 'Company',
        type: 'dropdown',
        required: true,
        options: [],
      },
      {
        name: 'roleId',
        label: 'Role',
        type: 'dropdown',
        required: true,
        options: [],
      },
      {
        name: 'workspaceId',
        label: 'Workspace',
        type: 'dropdown',
        required: true,
        options: [],
      },
    ],
  };

  ngOnInit(): void {
    this.loadCompanies();

    this.loadRoles();

    this.loadWorkspaces();

    this.loadMappings();
  }

  loadCompanies(): void {
    const userId = Number(localStorage.getItem('userId'));

    this.authService.getUserCompany(userId).subscribe({
      next: (response: any) => {
        this.companies = [
          {
            value: response.companyId,
            label: response.companyName,
          },
        ];

        const field = this.config.fields.find(
          (x: any) => x.name === 'companyId',
        );

        if (field) {
          field.options = this.companies;
        }

        this.mappingModel.companyId = response.companyId;
      },
    });
  }

  loadRoles(): void {
    this.administrationService.getRoles().subscribe({
      next: (response: any) => {
        const data = response.data ?? response;

        this.roles = data;

        const field = this.config.fields.find((x: any) => x.name === 'roleId');

        if (field) {
          field.options = data.map((x: any) => ({
            value: x.id,
            label: x.name,
          }));
        }
      },
    });
  }

  loadWorkspaces(): void {
    this.administrationService.getWorkspaces().subscribe({
      next: (response: any) => {
        const data = response.data ?? response;

        this.workspaces = data;

        const field = this.config.fields.find(
          (x: any) => x.name === 'workspaceId',
        );

        if (field) {
          field.options = data.map((x: any) => ({
            value: x.id,
            label: x.name,
          }));
        }
      },
    });
  }

  loadMappings(): void {
    this.administrationService.getRoleWorkspaces(this.companyId).subscribe({
      next: (response: any) => {
        this.mappings = response.data ?? response;

        this.updateStats();
      },
    });
  }

  updateStats(): void {
    this.config.stats = [
      {
        label: 'Assignments',

        value: this.mappings.length,

        icon: ICONS.workspaces,

        description: 'Workspace assignments',
      },
    ];
  }

  create(): void {
    this.mappingModel = {
      id: 0,
      companyId: this.companyId,
      roleId: null,
      workspaceId: null,
      isDelete: false,
    };

    this.showEntry = true;
  }

  edit(row: any): void {
    this.mappingModel = {
      id: row.id,
      companyId: row.companyId,
      roleId: row.roleId,
      workspaceId: row.workspaceId,
      isDelete: false,
    };

    this.showEntry = true;
  }

  save(): void {
    this.administrationService.saveRoleWorkspace(this.mappingModel).subscribe({
      next: (response: any) => {
        this.alert.success(response.message);

        this.showEntry = false;

        this.loadMappings();
      },
    });
  }

  async delete(row: any): Promise<void> {
    const confirmed = await this.alert.confirm('Delete selected assignment?');

    if (!confirmed) {
      return;
    }

    const model = {
      ...row,
      isDelete: true,
    };

    this.administrationService.saveRoleWorkspace(model).subscribe({
      next: () => {
        this.loadMappings();
      },
    });
  }

  cancel(): void {
    this.showEntry = false;
  }
}
