import { Component, OnInit } from '@angular/core';

import { MasterPageComponent }
from '../../../../shared/master-page/master-page.component';

import { AdministrationService }
from '../../../../services/administration-service/administration.service';

import { AuthService }
from '../../../../services/auth.service';

import { AlertService }
from '../../../../services/alert.service';

import { ICONS }
from '../../../../shared/icon.constants';

@Component({
  selector: 'app-role-profiles',
  standalone: true,
  imports: [
    MasterPageComponent
  ],
  templateUrl: './role-profiles.component.html',
  styleUrls: ['./role-profiles.component.scss']
})
export class RoleProfilesComponent
  implements OnInit {

  constructor(
    private administrationService:
      AdministrationService,

    private authService:
      AuthService,

    private alert:
      AlertService
  ) { }

  companyId = Number(
    localStorage.getItem(
      'companyId'
    )
  );

  roleProfiles: any[] = [];

  companies: any[] = [];

  loading = false;

  showEntry = false;

  roleProfileModel: any = {
    id: 0,
    companyId: null,
    name: '',
    code: '',
    description: '',
    isDefault: false,
    isDelete: false
  };

  config: any = {

    title: 'Role Profiles',

    description:
      'Manage role profiles',

    icon:
      ICONS.roles,

    createLabel:
      'Create Role Profile',

    stats: [],

    columns: [
      {
        field: 'name',
        header: 'Role Profile'
      },
      {
        field: 'code',
        header: 'Code'
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
          'companyId',
          'name'
        ]
      },
      {
        name: 'Settings',
        fields: [
          'description',
          'isDefault'
        ]
      }
    ],

    fields: [
      {
        name: 'companyId',
        label: 'Company',
        type: 'dropdown',
        required: true,
        options: []
      },
      {
        name: 'name',
        label: 'Role Profile',
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

    this.loadRoleProfiles();

    this.loadCompanies();
  }

  loadRoleProfiles(): void {

    this.loading = true;

    this.administrationService
      .getRoleProfiles(
        this.companyId
      )
      .subscribe({
        next: (response: any) => {

          this.roleProfiles =
            response.data ??
            response;

          this.updateStats(
            this.roleProfiles
          );

          this.loading = false;
        },
        error: (error) => {

          console.error(error);

          this.loading = false;
        }
      });
  }

  loadCompanies(): void {

    const userId =
      Number(
        localStorage.getItem(
          'userId'
        )
      );

    this.authService
      .getUserCompany(userId)
      .subscribe({
        next: (response: any) => {

          this.companies = [
            {
              value:
                response.companyId,
              label:
                response.companyName
            }
          ];

          const companyField =
            this.config.fields.find(
              (x: any) =>
                x.name === 'companyId'
            );

          if (companyField) {

            companyField.options =
              this.companies;
          }
        }
      });
  }

  updateStats(
    data: any[]
  ): void {

    this.config.stats = [
      {
        label:
          'Total Profiles',

        value:
          data.length,

        icon:
          ICONS.roles,

        description:
          'Available role profiles'
      },
      {
        label:
          'Default Profiles',

        value:
          data.filter(
            x => x.isDefault
          ).length,

        icon:
          ICONS.activeUsers,

        description:
          'Default assignments'
      }
    ];
  }

  createRoleProfile(): void {

    this.roleProfileModel = {
      id: 0,
      companyId:
        this.companyId,
      name: '',
      code: '',
      description: '',
      isDefault: false,
      isDelete: false
    };

    this.showEntry = true;
  }

  editRoleProfile(
    row: any
  ): void {

    this.administrationService
      .getRoleProfileById(
        this.companyId,
        row.id
      )
      .subscribe({
        next: (response: any) => {

          this.roleProfileModel =
            response.data ??
            response;

          this.showEntry = true;
        }
      });
  }

  saveRoleProfile(): void {

    this.roleProfileModel.companyId =
      this.companyId;

    this.administrationService
      .saveRoleProfile(
        this.roleProfileModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.showEntry = false;

          this.loadRoleProfiles();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save role profile.'
          );
        }
      });
  }

  async deleteRoleProfile(
    row: any
  ): Promise<void> {

    const confirmed =
      await this.alert.confirm(
        'Delete selected role profile?'
      );

    if (!confirmed) {
      return;
    }

    const model = {
      ...row,
      companyId:
        this.companyId,
      isDelete: true
    };

    this.administrationService
      .saveRoleProfile(
        model
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message
          );

          this.loadRoleProfiles();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete role profile.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}