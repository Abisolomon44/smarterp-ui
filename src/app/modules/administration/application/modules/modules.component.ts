import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private alert: AlertService
  ) { }

  modules: any[] = [];

  showEntry = false;

  moduleModel: any = {
    id: 0,
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
    description: 'Manage application modules',
    icon: ICONS.module,
    createLabel: 'Create Module',

    stats: [],

    columns: [
      { field: 'name', header: 'Module Name' },
      { field: 'code', header: 'Code' },
      { field: 'routeUrl', header: 'Route' },
      { field: 'sortOrder', header: 'Order' }
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
          'sortOrder',
          'parentModuleId'
        ]
      }
    ],

    fields: [
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
        name: 'parentModuleId',
        label: 'Parent Module',
        type: 'dropdown',
        options: []
      }
    ]
  };

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {

    this.administrationService
      .getModules()
      .subscribe({
        next: (response) => {

          this.modules = response;

          this.bindParentModules(response);

          this.updateStats(response);
        }
      });
  }

  bindParentModules(data: any[]): void {

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

  updateStats(data: any[]): void {

    this.config.stats = [
      {
        label: 'Total Modules',
        value: data.length,
        icon: ICONS.module,
        description: 'Available modules'
      }
    ];
  }

  createModule(): void {

    this.moduleModel = {
      id: 0,
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

  editModule(module: any): void {

    this.administrationService
      .getModuleById(module.id)
      .subscribe({
        next: (response) => {

          this.moduleModel = response;

          this.showEntry = true;
        }
      });
  }

  saveModule(): void {

    this.administrationService
      .saveModule(this.moduleModel)
      .subscribe({
        next: () => {

          this.alert.success(
            'Module saved successfully.'
          );

          this.showEntry = false;

          this.loadModules();
        }
      });
  }

  async deleteModule(module: any): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected module?'
      );

    if (!confirmed) {
      return;
    }

    this.administrationService
      .saveModule({
        ...module,
        isDelete: true
      })
      .subscribe({
        next: () => {

          this.alert.success(
            'Module deleted successfully.'
          );

          this.loadModules();
        }
      });
  }

  cancel(): void {
    this.showEntry = false;
  }
}