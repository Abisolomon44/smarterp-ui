import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { UserService } from '../../../../services/user-service/user.service';

import { ICONS } from '../../../../shared/icon.constants';
import { MasterService } from '../../../../services/master-service/master.service';
import { AlertService } from '../../../../services/alert.service';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private masterService: MasterService,
    private alert: AlertService,
  ) {}

  users: any[] = [];

  loading = false;
  languages: any[] = [];
  timeZones: any[] = [];
  showEntry = false;

  userModel: any = {
    id: 0,

    companyId: 5,

    firstName: '',

    lastName: '',

    displayName: '',

    email: '',

    phone: '',

    password: '',

    languageId: 1,

    timeZoneId: 1,

    isDelete: false,
  };

  config: any = {
    title: 'Users',

    description: 'Manage system users and access',

    icon: ICONS.users,

    createLabel: 'Create User',

    stats: [],

    columns: [
      {
        field: 'displayName',
        header: 'User Name',
      },

      {
        field: 'email',
        header: 'Email',
      },

      {
        field: 'phone',
        header: 'Phone',
      },

      {
        field: 'isActive',
        header: 'Status',
      },
    ],

    tabs: [
      {
        name: 'General',
        fields: ['firstName', 'lastName', 'displayName', 'email', 'phone'],
      },

      {
        name: 'Security',
        fields: ['password', 'isActive'],
      },

      {
        name: 'Preferences',
        fields: ['languageId', 'timeZoneId'],
      },
    ],

    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        keyType: 'alphabet',
      },

      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        keyType: 'alphabet',
      },

      {
        name: 'displayName',
        label: 'Display Name',
        type: 'text',
        required: true,
        keyType: 'alphabet',
      },

      {
        name: 'email',
        label: 'Email',
        type: 'text',
        required: true,
      },

      {
        name: 'phone',
        label: 'Phone Number',
        type: 'text',
        required: true,
        keyType: 'number',
        minLength: 10,
        maxLength: 10,
      },

      {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
      },

      {
        name: 'languageId',
        label: 'Language',
        type: 'dropdown',
        required: true,
        options: [],
      },

      {
        name: 'timeZoneId',
        label: 'Time Zone',
        type: 'dropdown',
        required: true,
        options: [],
      },
      {
        name: 'isActive',
        label: 'Active',
        type: 'toggle',
      },
    ],
  };

  ngOnInit(): void {
    this.loadUsers();
    this.loadLookups();
  }

  loadUsers(): void {
    const companyId = Number(localStorage.getItem('companyId')) || 5;

    this.loading = true;

    this.userService.getUsers(companyId).subscribe({
      next: (users: any[]) => {
        this.users = users.filter((x) => x.isActive === true);

        this.updateStats(users);

        this.loading = false;
      },

      error: (error: any) => {
        console.error(error);

        this.loading = false;
      },
    });
  }
  loadLookups(): void {
    this.masterService.getLanguages().subscribe({
      next: (response) => {
        this.languages = response;

        this.bindLanguageOptions();
      },
    });
    this.masterService.getTimeZones(1).subscribe({
      next: (response) => {
        console.log('TimeZone API Response', response);

        this.timeZones = response;

        this.bindTimeZoneOptions();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  bindTimeZoneOptions(): void {
    const field = this.config.fields.find((x: any) => x.name === 'timeZoneId');

    if (field) {
      field.options = this.timeZones.map((x: any) => ({
        value: x.id,
        label: x.name,
      }));
    }
  }
  bindLanguageOptions(): void {
    const field = this.config.fields.find((x: any) => x.name === 'languageId');

    if (field) {
      field.options = this.languages.map((x: any) => ({
        value: x.id,
        label: x.name,
      }));
    }
  }
  updateStats(users: any[]): void {
    this.config.stats = [
      {
        label: 'Total Users',
        value: users.length,
        icon: ICONS.users,
        description: 'All users',
      },

      {
        label: 'Active Users',
        value: users.filter((x) => x.isActive).length,
        icon: ICONS.activeUsers,
        description: 'Enabled users',
      },

      {
        label: 'Inactive Users',
        value: users.filter((x) => !x.isActive).length,
        icon: ICONS.inactiveUsers,
        description: 'Disabled users',
      },
    ];
  }

  createUser(): void {
    this.userModel = {
      id: 0,

      companyId: Number(localStorage.getItem('companyId')) || 5,

      firstName: '',

      lastName: '',

      displayName: '',

      email: '',

      phone: '',

      password: '',

      languageId: 1,

      timeZoneId: 1,

      isDelete: false,
    };

    this.showEntry = true;
  }

  editUser(user: any): void {
    this.userService.getUserById(user.id).subscribe({
      next: (response: any) => {
        this.userModel = response;

        this.showEntry = true;
      },
    });
  }

  saveUser(): void {
    const isUpdate = this.userModel.id > 0;

    this.userService.saveUser(this.userModel).subscribe({
      next: () => {
        this.alert.success(
          isUpdate
            ? 'User updated successfully.'
            : 'User created successfully.',
        );

        this.showEntry = false;

        this.loadUsers();
      },

      error: (error: any) => {
        console.error(error);

        this.alert.error('Unable to save user.');
      },
    });
  }
  async deleteUser(user: any): Promise<void> {
    const confirmed = await this.alert.confirm('Delete selected user?');

    if (!confirmed) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.alert.success('User deleted successfully.');

        this.loadUsers();
      },
    });
  }

  cancel(): void {
    this.showEntry = false;
  }
}
