import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { AdministrationService } from '../../../../services/administration-service/administration.service';
import { AuthService } from '../../../../services/auth.service';
import { AlertService } from '../../../../services/alert.service';

import { ICONS } from '../../../../shared/icon.constants';
import { UserService } from '../../../../services/user-service/user.service';
@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss',
})
export class UserRolesComponent implements OnInit {
  constructor(
    private administrationService: AdministrationService,
    private authService: AuthService,
    private alert: AlertService,
    private userService: UserService,
  ) {}

  companyId = Number(localStorage.getItem('companyId'));

  userRoles: any[] = [];

  users: any[] = [];

  roles: any[] = [];

  loading = false;

  showEntry = false;

  userRoleModel: any = {
    id: 0,
    companyId: this.companyId,
    userId: null,
    roleId: null,
    isDelete: false,
  };

  config: any = {
    title: 'User Roles',
    permissionName: 'User Role List',

    description: 'Assign roles to users',

    icon: ICONS.roles,

    createLabel: 'Assign Role',

    stats: [],

    columns: [
      {
        field: 'companyName',
        header: 'Company',
      },
      {
        field: 'userName',
        header: 'User',
      },
      {
        field: 'roleName',
        header: 'Role',
      },
      {
        field: 'isActive',
        header: 'Status',
      },
    ],
    fields: [
      {
        name: 'companyId',
        label: 'Company',
        type: 'dropdown',
        required: true,
        options: [],
      },
      {
        name: 'userId',
        label: 'User',
        type: 'dropdown',
        required: true,
        options: [],
      },
      {
        name: 'roleId',
        label: 'Role',
        type: 'dropdown',
        required: true,
        options: [],
      },
    ],

    tabs: [
      {
        name: 'General',
        fields: ['companyId', 'userId', 'roleId'],
      },
    ],
  };

  ngOnInit(): void {
    this.loadCompany();
    this.loadUsers();
    this.loadRoles();

    this.loadUserRoles();
  }


  loadCompany(): void {

  const userId =
    Number(localStorage.getItem('userId'));

  this.authService
    .getUserCompany(userId)
    .subscribe({
      next: (response: any) => {

        const companyField =
          this.config.fields.find(
            (x: any) =>
              x.name === 'companyId'
          );

        if (companyField) {

          companyField.options = [
            {
              value: response.companyId,
              label: response.companyName
            }
          ];
        }

        this.userRoleModel.companyId =
          response.companyId;
      }
    });
}
  loadUsers(): void {
    this.userService.getUsers(this.companyId).subscribe({
      next: (response: any) => {
        this.users = (response.data ?? response).map((x: any) => ({
          value: x.id,
          label: x.displayName,
        }));

        const field = this.config.fields.find((x: any) => x.name === 'userId');

        if (field) {
          field.options = this.users;
        }
      },
    });
  }

  loadRoles(): void {
    this.administrationService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = (response.data ?? response).map((x: any) => ({
          value: x.id,
          label: x.name,
        }));

        const field = this.config.fields.find((x: any) => x.name === 'roleId');

        if (field) {
          field.options = this.roles;
        }
      },
    });
  }

  loadUserRoles(): void {
    this.loading = true;

    this.administrationService.getUserRoles().subscribe({
      next: (response: any) => {
        this.userRoles = response.data ?? response;

        this.updateStats();

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  updateStats(): void {
    this.config.stats = [
      {
        label: 'Assignments',
        value: this.userRoles.length,
        icon: ICONS.roles,
        description: 'User role mappings',
      },
    ];
  }

  createUserRole(): void {
    this.userRoleModel = {
      id: 0,
      companyId: this.companyId,
      userId: null,
      roleId: null,
      isDelete: false,
    };

    this.showEntry = true;
  }

  editUserRole(row: any): void {
    this.userRoleModel = {
      ...row,
    };

    this.showEntry = true;
  }

  saveUserRole(): void {
    this.administrationService.saveUserRole(this.userRoleModel).subscribe({
      next: (response: any) => {
        this.alert.success(response.message);

        this.showEntry = false;

        this.loadUserRoles();
      },
      error: (error) => {
        this.alert.error(error?.error?.message ?? 'Unable to save.');
      },
    });
  }

  async deleteUserRole(row: any): Promise<void> {
    const confirmed = await this.alert.confirm('Delete selected mapping?');

    if (!confirmed) {
      return;
    }

    const model = {
      ...row,
      isDelete: true,
    };

    this.administrationService.saveUserRole(model).subscribe({
      next: (response: any) => {
        this.alert.success(response.message);

        this.loadUserRoles();
      },
    });
  }

  cancel(): void {
    this.showEntry = false;
  }
}
