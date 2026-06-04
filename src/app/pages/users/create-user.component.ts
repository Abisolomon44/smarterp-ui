import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user-service/user.service';
import { MasterService } from '../../services/master-service/master.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  user: any = {
    id: 0,
    companyId: 0,
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    phone: '',
    password: '',
    languageId: null,
    timeZoneId: null,
    isDelete: false
  };

  languages: any[] = [];
  timeZones: any[] = [];

  saving = false;

  constructor(
    private userService: UserService,
    private masterService: MasterService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadLanguages();


    this.loadCompany();
  }

  loadCompany(): void {

    const companyId = localStorage.getItem('companyId');

    if (companyId) {

      this.user.companyId = Number(companyId);
    }
  }

  loadLanguages(): void {

    this.masterService
      .getLanguages()
      .subscribe({
        next: (res: any) => {

          this.languages = res;
        },
        error: err => console.error(err)
      });
  }



  save(): void {

    if (!this.user.displayName) {

      alert('Display Name Required');
      return;
    }

    if (!this.user.email) {

      alert('Email Required');
      return;
    }

    if (!this.user.password) {

      alert('Password Required');
      return;
    }

    this.saving = true;

    this.userService
      .saveUser(this.user)
      .subscribe({
        next: (res) => {

          console.log(res);

          this.saving = false;

          alert('User Created Successfully');

          this.router.navigate(['/users']);
        },
        error: (err) => {

          console.error(err);

          this.saving = false;

          alert('Failed To Save User');
        }
      });
  }

  cancel(): void {

    this.router.navigate(['/users']);
  }
}