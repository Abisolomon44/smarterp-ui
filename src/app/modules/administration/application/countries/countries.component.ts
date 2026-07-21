import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { MasterService } from '../../../../services/master-service/master.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  constructor(
    private masterService: MasterService,
    private alert: AlertService
  ) { }

  countries: any[] = [];

  loading = false;

  showEntry = false;

  countryModel: any = {
    id: 0,
    name: '',
    code: '',
    isActive: true,
    isDelete: false
  };

  config: any = {

    title: 'Countries',
    permissionName: 'Country List',

    description:
      'Manage countries and regions',

    icon: ICONS.domain || 'globe',

    createLabel:
      'Create Country',

    stats: [],

    columns: [
      {
        field: 'name',
        header: 'Country Name'
      },
      {
        field: 'code',
        header: 'Country Code'
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
        label: 'Country Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'Country Code',
        type: 'text',
        required: true,
        placeholder: 'e.g., US, UK, IN'
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

    this.loadCountries();
  }

  loadCountries(): void {

    this.loading = true;

    this.masterService
      .getCountries()
      .subscribe({
        next: (response: any) => {

          this.countries =
            response.data ?? response;

          this.updateStats(
            this.countries
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Failed to load countries'
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
        label: 'Total Countries',
        value: data.length,
        icon: ICONS.domain || 'globe',
        description:
          'All countries and regions'
      },
      {
        label: 'Active Countries',
        value: activeCount,
        icon: ICONS.success || 'check-circle',
        description:
          'Currently active countries'
      }
    ];
  }

  createCountry(): void {

    this.countryModel = {
      id: 0,
      name: '',
      code: '',
      isActive: true,
      isDelete: false
    };

    this.showEntry = true;
  }

  editCountry(
    country: any
  ): void {

    this.countryModel = {
      ...country
    };

    this.showEntry = true;
  }

  saveCountry(): void {

    if (!this.countryModel.name) {

      this.alert.error(
        'Please enter country name'
      );

      return;
    }

    if (!this.countryModel.code) {

      this.alert.error(
        'Please enter country code'
      );

      return;
    }

    this.masterService
      .saveCountry(
        this.countryModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadCountries();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save country.'
          );
        }
      });
  }

  async deleteCountry(
    country: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected country?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...country,
      isDelete: true
    };

    this.masterService
      .saveCountry(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadCountries();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete country.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}
