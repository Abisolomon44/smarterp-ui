import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-sub-modules',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './sub-modules.component.html',
  styleUrls: ['./sub-modules.component.scss']
})
export class SubModulesComponent implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private alert: AlertService
  ) { }

  subModules: any[] = [];

  showEntry = false;

  subModuleModel: any = {
    id: 0,
    moduleId: 0,
    name: '',
    code: '',
    description: '',
    icon: '',
    routeUrl: '',
    sortOrder: 1,
    isDelete: false
  };

  config: any = {
    title: 'Sub Modules',

    description: 'Manage module screens',

    icon: ICONS.module,

    createLabel: 'Create Sub Module',

    stats: [],

    columns: [
      {
        field: 'name',
        header: 'Sub Module'
      },
      {
        field: 'code',
        header: 'Code'
      },
      {
        field: 'moduleId',
        header: 'Module'
      },
      {
        field: 'routeUrl',
        header: 'Route'
      }
    ],

    tabs: [
      {
        name: 'General',
        fields: [
          'moduleId',
          'name',
          'code',
          'description'
        ]
      },
      {
        name: 'Navigation',
        fields: [
          'icon',
          'routeUrl',
          'sortOrder'
        ]
      }
    ],

    fields: [
      {
        name: 'moduleId',
        label: 'Module',
        type: 'dropdown',
        required: true,
        options: []
      },
      {
        name: 'name',
        label: 'Sub Module Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'Sub Module Code',
        type: 'text',
        required: true
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea'
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
    this.loadSubModules();
    this.loadModules();
  }

  loadModules(): void {

    this.administrationService
      .getModules()
      .subscribe({
        next: (response) => {

          const field =
            this.config.fields.find(
              (x: any) =>
                x.name === 'moduleId'
            );

          if (field) {

            field.options =
              response.map((x: any) => ({
                value: x.id,
                label: x.name
              }));
          }
        }
      });
  }

  loadSubModules(): void {

    this.administrationService
      .getSubModules()
      .subscribe({
        next: (response) => {

          this.subModules = response;

          this.config.stats = [
            {
              label: 'Total Sub Modules',
              value: response.length,
              icon: ICONS.module,
              description: 'Available screens'
            }
          ];
        }
      });
  }

  createSubModule(): void {
    this.showEntry = true;
  }

  editSubModule(item: any): void {

    this.administrationService
      .getSubModuleById(item.id)
      .subscribe({
        next: (response) => {

          this.subModuleModel = response;

          this.showEntry = true;
        }
      });
  }

  saveSubModule(): void {

    this.administrationService
      .saveSubModule(this.subModuleModel)
      .subscribe({
        next: () => {

          this.alert.success(
            'Sub Module saved successfully.'
          );

          this.showEntry = false;

          this.loadSubModules();
        }
      });
  }

  async deleteSubModule(
    item: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected sub module?'
      );

    if (!confirmed) {
      return;
    }

    this.administrationService
      .saveSubModule({
        ...item,
        isDelete: true
      })
      .subscribe({
        next: () => {

          this.alert.success(
            'Sub Module deleted successfully.'
          );

          this.loadSubModules();
        }
      });
  }

  cancel(): void {
    this.showEntry = false;
  }
}