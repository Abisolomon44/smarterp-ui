import { Component, OnInit } from '@angular/core';

import { MasterPageComponent } from '../../../../shared/master-page/master-page.component';

import { UserService } from '../../../../services/user-service/user.service';

import { ICONS } from '../../../../shared/icon.constants';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MasterPageComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService) {}

  users: any[] = [];

  loading = false;

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
      },

      {
        name: 'timeZoneId',
        label: 'Time Zone',
        type: 'dropdown',
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
    this.userService.saveUser(this.userModel).subscribe({
      next: () => {
        this.showEntry = false;

        this.loadUsers();
      },

      error: (error: any) => {
        console.error(error);
      },
    });
  }

  deleteUser(user: any): void {
    if (!confirm('Delete User ?')) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.loadUsers();
      },
    });
  }

  cancel(): void {
    this.showEntry = false;
  }
}
