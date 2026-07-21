import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { MasterService } from '../../../../services/master-service/master.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-industry-types',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './industry-types.component.html',
  styleUrls: ['./industry-types.component.scss']
})
export class IndustryTypesComponent implements OnInit {

  constructor(
    private masterService: MasterService,
    private alert: AlertService
  ) { }

  industryTypes: any[] = [];

  loading = false;

  showEntry = false;

  industryTypeModel: any = {
    id: 0,
    name: '',
    code: '',
    isActive: true,
    isDelete: false
  };

  config: any = {

    title: 'Industry Types',
    permissionName: 'Industry Type List',

    description:
      'Manage industry types and sectors',

    icon: ICONS.layers || 'layers',

    createLabel:
      'Create Industry Type',

    stats: [],

    columns: [
      {
        field: 'name',
        header: 'Industry Type'
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
        label: 'Industry Type',
        type: 'text',
        required: true,
        placeholder: 'e.g., Technology, Healthcare, Finance'
      },
      {
        name: 'code',
        label: 'Code',
        type: 'text',
        required: true,
        placeholder: 'e.g., IT, HC, FIN'
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

    this.loadIndustryTypes();
  }

  loadIndustryTypes(): void {

    this.loading = true;

    this.masterService
      .getIndustryTypes()
      .subscribe({
        next: (response: any) => {

          this.industryTypes =
            response.data ?? response;

          this.updateStats(
            this.industryTypes
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Failed to load industry types'
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
        label: 'Total Industry Types',
        value: data.length,
        icon: ICONS.layers || 'layers',
        description:
          'All industry type classifications'
      },
      {
        label: 'Active Industry Types',
        value: activeCount,
        icon: ICONS.success || 'check-circle',
        description:
          'Currently active industry types'
      }
    ];
  }

  createIndustryType(): void {

    this.industryTypeModel = {
      id: 0,
      name: '',
      code: '',
      isActive: true,
      isDelete: false
    };

    this.showEntry = true;
  }

  editIndustryType(
    industryType: any
  ): void {

    this.industryTypeModel = {
      ...industryType
    };

    this.showEntry = true;
  }

  saveIndustryType(): void {

    if (!this.industryTypeModel.name) {

      this.alert.error(
        'Please enter industry type name'
      );

      return;
    }

    if (!this.industryTypeModel.code) {

      this.alert.error(
        'Please enter industry type code'
      );

      return;
    }

    this.masterService
      .saveIndustryType(
        this.industryTypeModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadIndustryTypes();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save industry type.'
          );
        }
      });
  }

  async deleteIndustryType(
    industryType: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected industry type?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...industryType,
      isDelete: true
    };

    this.masterService
      .saveIndustryType(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadIndustryTypes();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete industry type.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}
