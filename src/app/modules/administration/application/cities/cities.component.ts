import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { MasterService } from '../../../../services/master-service/master.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(
    private masterService: MasterService,
    private alert: AlertService
  ) { }

  cities: any[] = [];

  loading = false;

  showEntry = false;

  cityModel: any = {
    id: 0,
    name: '',
    code: '',
    stateId: null,
    isActive: true,
    isDelete: false
  };

  config: any = {

    title: 'Cities',
    permissionName: 'City List',

    description:
      'Manage cities and municipalities',

    icon: ICONS.company || 'building-2',

    createLabel:
      'Create City',

    stats: [],

    columns: [
      {
        field: 'stateName',
        header: 'State'
      },
      {
        field: 'countryName',
        header: 'Country'
      },
      {
        field: 'name',
        header: 'City Name'
      },
      {
        field: 'code',
        header: 'Code'
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
          'stateId',
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
        name: 'stateId',
        label: 'State',
        type: 'dropdown',
        required: true,
        options: []
      },
      {
        name: 'name',
        label: 'City Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'City Code',
        type: 'text',
        required: true
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

    this.loadStates();

    this.loadCities();
  }

  loadStates(): void {

    this.masterService
      .getStates(0)
      .subscribe({
        next: (response: any) => {

          const states =
            response.data ?? response;

          const stateField =
            this.config.fields.find(
              (x: any) =>
                x.name === 'stateId'
            );

          if (stateField) {

            stateField.options =
              states.map(
                (x: any) => ({
                  value: x.id,
                  label: x.name
                })
              );
          }
        },
        error: (error) => {

          console.error(
            'Error loading states:',
            error
          );

          this.alert.error(
            'Failed to load states'
          );
        }
      });
  }

  loadCities(): void {

    this.loading = true;

    this.masterService
      .getCities(0)
      .subscribe({
        next: (response: any) => {

          this.cities =
            response.data ?? response;

          this.updateStats(
            this.cities
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Failed to load cities'
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
        label: 'Total Cities',
        value: data.length,
        icon: ICONS.company || 'building-2',
        description:
          'All cities and municipalities'
      },
      {
        label: 'Active Cities',
        value: activeCount,
        icon: ICONS.success || 'check-circle',
        description:
          'Currently active cities'
      }
    ];
  }

  createCity(): void {

    this.cityModel = {
      id: 0,
      name: '',
      code: '',
      stateId: null,
      isActive: true,
      isDelete: false
    };

    this.showEntry = true;
  }

  editCity(
    city: any
  ): void {

    this.cityModel = {
      ...city
    };

    this.showEntry = true;
  }

  saveCity(): void {

    if (!this.cityModel.stateId) {

      this.alert.error(
        'Please select a state'
      );

      return;
    }

    if (!this.cityModel.name) {

      this.alert.error(
        'Please enter city name'
      );

      return;
    }

    if (!this.cityModel.code) {

      this.alert.error(
        'Please enter city code'
      );

      return;
    }

    this.masterService
      .saveCity(
        this.cityModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadCities();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save city.'
          );
        }
      });
  }

  async deleteCity(
    city: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected city?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...city,
      isDelete: true
    };

    this.masterService
      .saveCity(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadCities();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete city.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}
