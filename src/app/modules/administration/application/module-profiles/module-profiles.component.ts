import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-module-profiles',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './module-profiles.component.html',
  styleUrls: ['./module-profiles.component.scss']
})
export class ModuleProfilesComponent implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private alert: AlertService
  ) { }

  moduleProfiles: any[] = [];

  loading = false;

  showEntry = false;

  moduleProfileModel: any = {
    id: 0,
    name: '',
    code: '',
    description: '',
    isDefault: false,
    isDelete: false
  };

  config: any = {
    title: 'Module Profiles',

    description: 'Manage module profile templates',

    icon: ICONS.module,

    createLabel: 'Create Module Profile',

    stats: [],

    columns: [
      {
        field: 'name',
        header: 'Profile Name'
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
        label: 'Profile Name',
        type: 'text',
        required: true
      },

      {
        name: 'code',
        label: 'Profile Code',
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
        label: 'Default Profile',
        type: 'toggle'
      }
    ]
  };

  ngOnInit(): void {
    this.loadModuleProfiles();
  }

  loadModuleProfiles(): void {

    this.loading = true;

    this.administrationService
      .getModuleProfiles()
      .subscribe({
        next: (response: any[]) => {

          this.moduleProfiles = response;

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
        label: 'Total Profiles',
        value: data.length,
        icon: ICONS.module,
        description: 'Available profiles'
      },
      {
        label: 'Default Profiles',
        value: data.filter(
          x => x.isDefault
        ).length,
        icon: ICONS.activeUsers,
        description: 'Default templates'
      }
    ];
  }

  createModuleProfile(): void {

    this.moduleProfileModel = {
      id: 0,
      name: '',
      code: '',
      description: '',
      isDefault: false,
      isDelete: false
    };

    this.showEntry = true;
  }

  editModuleProfile(
    profile: any
  ): void {

    this.administrationService
      .getModuleProfileById(profile.id)
      .subscribe({
        next: (response) => {

          this.moduleProfileModel = response;

          this.showEntry = true;
        }
      });
  }

  saveModuleProfile(): void {

    const isUpdate =
      this.moduleProfileModel.id > 0;

    this.administrationService
      .saveModuleProfile(
        this.moduleProfileModel
      )
      .subscribe({
        next: () => {

          this.alert.success(
            isUpdate
              ? 'Module profile updated successfully.'
              : 'Module profile created successfully.'
          );

          this.showEntry = false;

          this.loadModuleProfiles();
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Unable to save module profile.'
          );
        }
      });
  }

  async deleteModuleProfile(
    profile: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected module profile?'
      );

    if (!confirmed) {
      return;
    }

    this.administrationService
      .saveModuleProfile({
        ...profile,
        isDelete: true
      })
      .subscribe({
        next: () => {

          this.alert.success(
            'Module profile deleted successfully.'
          );

          this.loadModuleProfiles();
        }
      });
  }

  cancel(): void {
    this.showEntry = false;
  }
}