import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

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
    private alert: AlertService
  ) { }

  domains: any[] = [];

  showEntry = false;

  loading = false;

  domainModel: any = {
    id: 0,
    workspaceId: 0,
    name: '',
    code: '',
    icon: '',
    sortOrder: 1,
    isDelete: false
  };

  config: any = {
    title: 'Domains',

    description: 'Manage business domains',

    icon: ICONS.domain,

    createLabel: 'Create Domain',

    stats: [],

    columns: [
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
          'workspaceId',
          'name',
          'code'
        ]
      },
      {
        name: 'Settings',
        fields: [
          'icon',
          'sortOrder'
        ]
      }
    ],

    fields: [
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
        required: true
      },

      {
        name: 'icon',
        label: 'Icon',
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
    this.loadDomains();
    this.loadWorkspaces();
  }

  loadDomains(): void {

    this.loading = true;

    this.administrationService
      .getDomains()
      .subscribe({
        next: (response: any[]) => {

          this.domains = response;

          this.updateStats(response);

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
        next: (response: any[]) => {

          const field =
            this.config.fields.find(
              (x: any) =>
                x.name === 'workspaceId'
            );

          if (field) {

            field.options =
              response.map(
                (x: any) => ({
                  value: x.id,
                  label: x.name
                })
              );
          }
        }
      });
  }

  updateStats(data: any[]): void {

    this.config.stats = [
      {
        label: 'Total Domains',
        value: data.length,
        icon: ICONS.domain,
        description: 'Available domains'
      }
    ];
  }

  createDomain(): void {

    this.domainModel = {
      id: 0,
      workspaceId: 0,
      name: '',
      code: '',
      icon: '',
      sortOrder: 1,
      isDelete: false
    };

    this.showEntry = true;
  }

  editDomain(domain: any): void {

    this.administrationService
      .getDomainById(domain.id)
      .subscribe({
        next: (response) => {

          this.domainModel = response;

          this.showEntry = true;
        }
      });
  }

  saveDomain(): void {

    const isUpdate =
      this.domainModel.id > 0;

    this.administrationService
      .saveDomain(this.domainModel)
      .subscribe({
        next: () => {

          this.alert.success(
            isUpdate
              ? 'Domain updated successfully.'
              : 'Domain created successfully.'
          );

          this.showEntry = false;

          this.loadDomains();
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
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
      isDelete: true
    };

    this.administrationService
      .saveDomain(model)
      .subscribe({
        next: () => {

          this.alert.success(
            'Domain deleted successfully.'
          );

          this.loadDomains();
        }
      });
  }

  cancel(): void {
    this.showEntry = false;
  }
}