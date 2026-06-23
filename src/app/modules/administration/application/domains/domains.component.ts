import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { AuthService } from '../../../../services/auth.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-domains',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  companyId = Number(
    localStorage.getItem('companyId')
  );

  domains: any[] = [];

  loading = false;

  showEntry = false;

  domainModel: any = {
    id: 0,
    companyId: this.companyId,
    workspaceId: null,
    name: '',
    code: '',
    icon: '',
    routeUrl: '',
    sortOrder: 1,
    isDelete: false
  };

  config: any = {

    title: 'Domains',
    permissionName: 'Domain List',


    description:
      'Manage business domains',

    icon: ICONS.domain,

    createLabel:
      'Create Domain',

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
        field: 'name',
        header: 'Domain Name'
      },
      {
        field: 'code',
        header: 'Code'
      },
      {
        field: 'sortOrder',
        header: 'Sort Order'
      }
    ],

    tabs: [
      {
        name: 'General',
        fields: [
          'companyId',
          'workspaceId',
          'name'
        ]
      },
      {
        name: 'Settings',
        fields: [
          'icon',
          'routeUrl',
          'sortOrder'
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
        name: 'name',
        label: 'Domain Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'Domain Code',
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
      }
    ]
  };

  ngOnInit(): void {

    this.loadCompany();

    this.loadDomains();

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

          const data =
            response.data ?? response;

          const companyField =
            this.config.fields.find(
              (x: any) =>
                x.name === 'companyId'
            );

          if (companyField) {

            companyField.options = [
              {
                value: data.companyId,
                label: data.companyName
              }
            ];
          }

          this.companyId =
            data.companyId;

          this.domainModel.companyId =
            data.companyId;
        }
      });
  }

  loadDomains(): void {

    this.loading = true;

    this.administrationService
      .getDomains()
      .subscribe({
        next: (response: any) => {

          this.domains =
            response.data ?? response;

          this.updateStats(
            this.domains
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  loadWorkspaces(): void {

    this.administrationService
      .getWorkspaces()
      .subscribe({
        next: (response: any) => {

          const workspaces =
            response.data ?? response;

          const field =
            this.config.fields.find(
              (x: any) =>
                x.name === 'workspaceId'
            );

          if (field) {

            field.options =
              workspaces.map(
                (x: any) => ({
                  value: x.id,
                  label: x.name
                })
              );
          }
        }
      });
  }

  updateStats(
    data: any[]
  ): void {

    this.config.stats = [
      {
        label: 'Total Domains',
        value: data.length,
        icon: ICONS.domain,
        description:
          'Available domains'
      }
    ];
  }

  createDomain(): void {

    this.domainModel = {
      id: 0,
      companyId: this.companyId,
      workspaceId: null,
      name: '',
      code: '',
      icon: '',
      routeUrl: '',
      sortOrder: 1,
      isDelete: false
    };

    this.showEntry = true;
  }

  editDomain(
    domain: any
  ): void {

    this.administrationService
      .getDomainById(
        domain.id
      )
      .subscribe({
        next: (response: any) => {

          this.domainModel =
            response.data ?? response;

          this.showEntry = true;
        }
      });
  }

  saveDomain(): void {

    this.domainModel.companyId =
      this.companyId;

    this.administrationService
      .saveDomain(
        this.domainModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadDomains();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save domain.'
          );
        }
      });
  }

  async deleteDomain(
    domain: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected domain?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...domain,
      companyId: this.companyId,
      isDelete: true
    };

    this.administrationService
      .saveDomain(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadDomains();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete domain.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}