import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { MasterService } from '../../../../services/master-service/master.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';
import { Globe } from 'lucide-angular';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  constructor(
    private masterService: MasterService,
    private alert: AlertService
  ) { }

  languages: any[] = [];

  loading = false;

  showEntry = false;

  languageModel: any = {
    id: 0,
    name: '',
    code: '',
    isActive: true,
    isDelete: false
  };

  config: any = {

    title: 'Languages',
    permissionName: 'Language List',

    description:
      'Manage supported languages',

  globe: Globe,

    createLabel:
      'Create Language',

    stats: [],

    columns: [
      {
        field: 'name',
        header: 'Language Name'
      },
      {
        field: 'code',
        header: 'Language Code'
      },
      {
        field: 'isActive',
        header: 'Status'
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
        name: 'Settings',
        fields: [
          'isActive'
        ]
      }
    ],

    fields: [
      {
        name: 'name',
        label: 'Language Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'Language Code',
        type: 'text',
        required: true,
        placeholder: 'e.g., en, es, fr'
      },
      {
        name: 'isActive',
        label: 'Active',
        type: 'checkbox',
        required: false
      }
    ]
  };

  ngOnInit(): void {

    this.loadLanguages();
  }

  loadLanguages(): void {

    this.loading = true;

    this.masterService
      .getLanguages()
      .subscribe({
        next: (response: any) => {

          this.languages =
            response.data ?? response;

          this.updateStats(
            this.languages
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Failed to load languages'
          );

          this.loading = false;
        }
      });
  }

  updateStats(
    data: any[]
  ): void {

    const activeCount = data.filter(
      (x: any) => x.isActive
    ).length;

    this.config.stats = [
      {
        label: 'Total Languages',
        value: data.length,
      globe: Globe,
        description:
          'All supported languages'
      },
      {
        label: 'Active Languages',
        value: activeCount,
        icon: ICONS.success || 'check-circle',
        description:
          'Currently active languages'
      }
    ];
  }

  createLanguage(): void {

    this.languageModel = {
      id: 0,
      name: '',
      code: '',
      isActive: true,
      isDelete: false
    };

    this.showEntry = true;
  }

  editLanguage(
    language: any
  ): void {

    this.languageModel = {
      ...language
    };

    this.showEntry = true;
  }

  saveLanguage(): void {

    if (!this.languageModel.name) {

      this.alert.error(
        'Please enter language name'
      );

      return;
    }

    if (!this.languageModel.code) {

      this.alert.error(
        'Please enter language code'
      );

      return;
    }

    this.masterService
      .saveLanguage(
        this.languageModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadLanguages();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save language.'
          );
        }
      });
  }

  async deleteLanguage(
    language: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected language?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...language,
      isDelete: true
    };

    this.masterService
      .saveLanguage(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadLanguages();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete language.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}
