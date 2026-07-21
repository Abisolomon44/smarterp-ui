import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';

import { MasterService } from '../../../../services/master-service/master.service';

import { AuthService } from '../../../../services/auth.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  constructor(
    private administrationService: AdministrationService,
    private masterService: MasterService,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  companyId = Number(
    localStorage.getItem('companyId')
  );

  states: any[] = [];

  loading = false;

  showEntry = false;

  stateModel: any = {
    id: 0,
    name: '',
    code: '',
    countryId: null,
    isActive: true,
    isDelete: false
  };

  config: any = {

    title: 'States',
    permissionName: 'State List',

    description:
      'Manage states and provinces',

    icon: ICONS.domain || 'map-pin',

    createLabel:
      'Create State',

    stats: [],

    columns: [
      {
        field: 'countryName',
        header: 'Country'
      },
      {
        field: 'name',
        header: 'State Name'
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
          'countryId',
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
        name: 'countryId',
        label: 'Country',
        type: 'dropdown',
        required: true,
        options: []
      },
      {
        name: 'name',
        label: 'State Name',
        type: 'text',
        required: true
      },
      {
        name: 'code',
        label: 'State Code',
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

    this.loadCountries();

    this.loadStates();
  }

  loadCountries(): void {

    this.masterService
      .getCountries()
      .subscribe({
        next: (response: any) => {

          const countries =
            response.data ?? response;

          const countryField =
            this.config.fields.find(
              (x: any) =>
                x.name === 'countryId'
            );

          if (countryField) {

            countryField.options =
              countries.map(
                (x: any) => ({
                  value: x.id,
                  label: x.name
                })
              );
          }
        },
        error: (error) => {

          console.error(
            'Error loading countries:',
            error
          );

          this.alert.error(
            'Failed to load countries'
          );
        }
      });
  }

  loadStates(): void {

    this.loading = true;

    this.masterService
      .getStates(0)
      .subscribe({
        next: (response: any) => {

          this.states =
            response.data ?? response;

          this.updateStats(
            this.states
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Failed to load states'
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
        label: 'Total States',
        value: data.length,
        icon: ICONS.domain || 'map-pin',
        description:
          'All states and provinces'
      },
      {
        label: 'Active States',
        value: activeCount,
        icon: ICONS.success || 'check-circle',
        description:
          'Currently active states'
      }
    ];
  }

  createState(): void {

    this.stateModel = {
      id: 0,
      name: '',
      code: '',
      countryId: null,
      isActive: true,
      isDelete: false
    };

    this.showEntry = true;
  }

  editState(
    state: any
  ): void {

    this.stateModel = {
      ...state
    };

    this.showEntry = true;
  }

  saveState(): void {

    if (!this.stateModel.countryId) {

      this.alert.error(
        'Please select a country'
      );

      return;
    }

    if (!this.stateModel.name) {

      this.alert.error(
        'Please enter state name'
      );

      return;
    }

    if (!this.stateModel.code) {

      this.alert.error(
        'Please enter state code'
      );

      return;
    }

    this.masterService
      .saveState(
        this.stateModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadStates();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save state.'
          );
        }
      });
  }

  async deleteState(
    state: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected state?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...state,
      isDelete: true
    };

    this.masterService
      .saveState(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadStates();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete state.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}
