import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { MasterService } from '../../../../services/master-service/master.service';

import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-business-types',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './business-types.component.html',
  styleUrls: ['./business-types.component.scss']
})
export class BusinessTypesComponent implements OnInit {

  constructor(
    private masterService: MasterService,
    private alert: AlertService
  ) { }

  businessTypes: any[] = [];

  loading = false;

  showEntry = false;

  businessTypeModel: any = {
    id: 0,
    name: '',
    code: '',
    isActive: true,
    isDelete: false
  };

  config: any = {

    title: 'Business Types',
    permissionName: 'Business Type List',

    description:
      'Manage business types and classifications',

    icon: ICONS.briefcase || 'briefcase',

    createLabel:
      'Create Business Type',

    stats: [],

    columns: [
      {
        field: 'name',
        header: 'Business Type'
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
        label: 'Business Type',
        type: 'text',
        required: true,
        placeholder: 'e.g., Retail, Wholesale, Manufacturing'
      },
      {
        name: 'code',
        label: 'Code',
        type: 'text',
        required: true,
        placeholder: 'e.g., RET, WHL, MFG'
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

    this.loadBusinessTypes();
  }

  loadBusinessTypes(): void {

    this.loading = true;

    this.masterService
      .getBusinessTypes()
      .subscribe({
        next: (response: any) => {

          this.businessTypes =
            response.data ?? response;

          this.updateStats(
            this.businessTypes
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Failed to load business types'
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
        label: 'Total Business Types',
        value: data.length,
        icon: ICONS.briefcase || 'briefcase',
        description:
          'All business type classifications'
      },
      {
        label: 'Active Business Types',
        value: activeCount,
        icon: ICONS.success || 'check-circle',
        description:
          'Currently active business types'
      }
    ];
  }

  createBusinessType(): void {

    this.businessTypeModel = {
      id: 0,
      name: '',
      code: '',
      isActive: true,
      isDelete: false
    };

    this.showEntry = true;
  }

  editBusinessType(
    businessType: any
  ): void {

    this.businessTypeModel = {
      ...businessType
    };

    this.showEntry = true;
  }

  saveBusinessType(): void {

    if (!this.businessTypeModel.name) {

      this.alert.error(
        'Please enter business type name'
      );

      return;
    }

    if (!this.businessTypeModel.code) {

      this.alert.error(
        'Please enter business type code'
      );

      return;
    }

    this.masterService
      .saveBusinessType(
        this.businessTypeModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadBusinessTypes();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save business type.'
          );
        }
      });
  }

  async deleteBusinessType(
    businessType: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected business type?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...businessType,
      isDelete: true
    };

    this.masterService
      .saveBusinessType(model)
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadBusinessTypes();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete business type.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}
