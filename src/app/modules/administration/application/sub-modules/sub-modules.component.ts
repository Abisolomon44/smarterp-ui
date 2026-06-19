import {
  Component,
  OnInit
} from '@angular/core';

import {
  MasterPageComponent
} from '../../../../shared/master-page/master-page.component';

import {
  AdministrationService
} from '../../../../services/administration-service/administration.service';

import {
  AlertService
} from '../../../../services/alert.service';

import {
  AuthService
} from '../../../../services/auth.service';

import {
  ICONS
} from '../../../../shared/icon.constants';

@Component({
  selector: 'app-sub-modules',
  standalone: true,
  imports: [
    MasterPageComponent
  ],
  templateUrl:
    './sub-modules.component.html',
  styleUrls: [
    './sub-modules.component.scss'
  ]
})
export class SubModulesComponent
  implements OnInit {

  constructor(
    private administrationService:
      AdministrationService,

    private authService:
      AuthService,

    private alert:
      AlertService
  ) { }

  companyId = 0;

  companies: any[] = [];

  subModules: any[] = [];

  showEntry = false;

  subModuleModel: any = {
    id: 0,
    companyId: null,
    moduleId: null,
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

    description:
      'Manage module screens',

    icon:
      ICONS.module,

    createLabel:
      'Create Sub Module',

    stats: [],

    columns: [
      {
        field: 'companyName',
        header: 'Company'
      },
      {
        field: 'moduleName',
        header: 'Module'
      },
      {
        field: 'name',
        header: 'Sub Module'
      },
      {
        field: 'code',
        header: 'Code'
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
          'companyId',
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
        name: 'companyId',
        label: 'Company',
        type: 'dropdown',
        required: true,
        options: []
      },
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

    this.loadCompany();
  }

  loadCompany(): void {

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

          this.companyId =
            response.companyId;

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

          this.subModuleModel.companyId =
            this.companyId;

          this.loadModules();

          this.loadSubModules();
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Unable to load company.'
          );
        }
      });
  }

  loadModules(): void {

    this.administrationService
      .getModulesByCompanyId(
        this.companyId
      )
      .subscribe({
        next: (response: any) => {

          const data =
            response.data ??
            response;

          const moduleField =
            this.config.fields.find(
              (x: any) =>
                x.name === 'moduleId'
            );

          if (moduleField) {

            moduleField.options =
              data.map(
                (x: any) => ({
                  value: x.id,
                  label: x.name
                })
              );
          }
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Unable to load modules.'
          );
        }
      });
  }

  loadSubModules(): void {

    this.administrationService
      .getSubModules(
        this.companyId
      )
      .subscribe({
        next: (response: any) => {

          this.subModules =
            response.data ??
            response;

          this.updateStats();
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Unable to load sub modules.'
          );
        }
      });
  }

  updateStats(): void {

    this.config.stats = [
      {
        label:
          'Total Sub Modules',

        value:
          this.subModules.length,

        icon:
          ICONS.module,

        description:
          'Available screens'
      }
    ];
  }

  createSubModule(): void {

    this.subModuleModel = {

      id: 0,

      companyId:
        this.companyId,

      moduleId: null,

      name: '',

      code: '',

      description: '',

      icon: '',

      routeUrl: '',

      sortOrder: 1,

      isDelete: false
    };

    this.showEntry = true;
  }

  editSubModule(
    item: any
  ): void {

    this.administrationService
      .getSubModuleById(
        item.id
      )
      .subscribe({
        next: (response: any) => {

          this.subModuleModel =
            response.data ??
            response;

          this.showEntry = true;
        },
        error: (error) => {

          console.error(error);

          this.alert.error(
            'Unable to load sub module.'
          );
        }
      });
  }

  saveSubModule(): void {

    this.subModuleModel.companyId =
      this.companyId;

    this.administrationService
      .saveSubModule(
        this.subModuleModel
      )
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message ??
            'Sub Module saved successfully.'
          );

          this.showEntry = false;

          this.loadSubModules();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to save sub module.'
          );
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
        companyId:
          this.companyId,
        isDelete: true
      })
      .subscribe({
        next: (response: any) => {

          this.alert.success(
            response.message ??
            'Sub Module deleted successfully.'
          );

          this.loadSubModules();
        },
        error: (error) => {

          this.alert.error(
            error?.error?.message ??
            'Unable to delete sub module.'
          );
        }
      });
  }

  cancel(): void {

    this.showEntry = false;
  }
}