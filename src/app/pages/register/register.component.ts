import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    this.authService
      .register({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => alert('Registered Successfully '),
        error: () => alert('Registration Failed '),
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
