import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  name = '';
  email = '';
  password = '';
  role = 'user';

  saving = false;

  constructor(private authService: AuthService, private router: Router) {}

  create() {
    if (!this.email || !this.password || !this.name) {
      alert('Please fill name, email and password');
      return;
    }
    this.saving = true;
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.saving = false;
        alert('User created successfully');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.saving = false;
        console.error(err);
        alert('Failed to create user');
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
