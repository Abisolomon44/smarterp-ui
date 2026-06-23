import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';
import { AuthService } from '../../../../services/auth.service';
import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent
  implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  companyId = Number(
    localStorage.getItem('companyId')
  );

  modules: any[] = [];

  workspaces: any[] = [];

  domains: any[] = [];

  loading = false;

  showEntry = false;

  moduleModel: any = {
    id: 0,
    companyId: this.companyId,
    workspaceId: null,
    domainId: null,
    name: '',
    code: '',
    icon: '',
    routeUrl: '',
    sortOrder: 1,
    parentModuleId: null,
    isDelete: false
  };

  config: any = {

    title: 'Modules',
    permissionName: 'Module List',

    

    description:
      'Manage application modules',

    icon: ICONS.module,

    createLabel:
      'Create Module',

    stats: [],

    columns: [
      {
        field: 'companyName',
        header: 'Company'
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
        field: 'name',
        header: 'Module Name'
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
        header: 'Order'
      }
    ],

    tabs: [
      {
        name: 'General',
        fields: [
          'companyId',
          'workspaceId',
          'domainId',
          'name'
        ]
      },
      {
        name: 'Navigation',
        fields: [
          'icon',
          'routeUrl',
          'sortOrder',
          'parentModuleId'
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
        name: 'workspaceId',
        label: 'Workspace',
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
      },
      {
        name: 'name',
        label: 'Module Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'Module Code',
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
        type: 'number'
      },
      {
        name: 'parentModuleId',
        label: 'Parent Module',
        type: 'dropdown',
        options: []
      }
    ]
  };
ngOnInit(): void {

  this.loadCompany();

  this.loadWorkspaces();

  this.loadDomains();

  this.loadModules();
}
loadCompany(): void {

  const userId =
    Number(
      localStorage.getItem(
        'userId'
      )
    );

  this.authService
    .getUserCompany(
      userId
    )
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
              value:
                response.companyId,
              label:
                response.companyName
            }
          ];
        }

        this.moduleModel.companyId =
          response.companyId;

        this.loadModules();
      },
      error: (error: any) => {

        console.error(error);

        this.alert.error(
          'Unable to load company.'
        );
      }
    });
}
  loadWorkspaces(): void {

    this.administrationService
      .getWorkspaces()
      .subscribe({
        next: (response: any) => {

          this.workspaces =
            response.data ?? response;

          const field =
            this.config.fields.find(
              (x: any) =>
                x.name === 'workspaceId'
            );

          if (field) {

            field.options =
              this.workspaces.map(
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
  }
loadModules(): void {

  this.loading = true;

  this.administrationService
    .getModules()
    .subscribe({
      next: (response: any) => {

        this.modules =
          response.data ?? response;

        this.bindParentModules(
          this.modules
        );

        this.updateStats(
          this.modules
        );

        this.loading = false;
      },
      error: (error) => {

        console.error(error);

        this.loading = false;
      }
    });
}

  bindParentModules(
    data: any[]
  ): void {

    const field =
      this.config.fields.find(
        (x: any) =>
          x.name === 'parentModuleId'
      );

    if (field) {

      field.options =
        data.map((x: any) => ({
          value: x.id,
          label: x.name
        }));
    }
  }

  updateStats(
    data: any[]
  ): void {

    this.config.stats = [
      {
        label: 'Total Modules',
        value: data.length,
        icon: ICONS.module,
        description:
          'Available modules'
      }
    ];
  }

  createModule(): void {

    this.moduleModel = {
      id: 0,
      companyId: this.companyId,
      workspaceId: null,
      domainId: null,
      name: '',
      code: '',
      icon: '',
      routeUrl: '',
      sortOrder: 1,
      parentModuleId: null,
      isDelete: false
    };

    this.showEntry = true;
  }

  editModule(
    module: any
  ): void {

    this.administrationService
      .getModuleById(module.id)
      .subscribe({
        next: (response: any) => {

          this.moduleModel =
            response.data ?? response;

          this.showEntry = true;
        }
      });
  }

  saveModule(): void {

    this.moduleModel.companyId =
      this.companyId;

    this.administrationService
      .saveModule(
        this.moduleModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadModules();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save module.'
          );
        }
      });
  }

  async deleteModule(
    module: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected module?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...module,
      companyId: this.companyId,
      isDelete: true
    };

    this.administrationService
      .saveModule(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadModules();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete module.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}