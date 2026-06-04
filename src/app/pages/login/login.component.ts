import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email      = '';
  password   = '';
  rememberMe = false;

  showPassword = false;
  isLoading    = false;
  loginError   = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /* ── Toggle password visibility ── */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /* ── Clear error on any field change ── */
  clearError(): void {
    this.loginError = '';
  }

  /* ── Main login ── */
  login(): void {

    this.loginError = '';

    if (!this.email || !this.password) {
      this.loginError = 'Please enter your email and password.';
      return;
    }

    this.isLoading = true;

    this.authService.login({
      email:    this.email,
      password: this.password
    }).subscribe({

      next: (res: any) => {

        this.authService.saveToken(res.token);

        const storage = this.rememberMe ? localStorage : sessionStorage;
        storage.setItem('userId',    res.userId);
        storage.setItem('companyId', res.companyId);

        this.router.navigate(['/dashboard']);
      },

      error: (err: any) => {
        this.isLoading  = false;
        this.loginError =
          err?.error?.message ?? 'Invalid email or password. Please try again.';
      }

    });

  }

  /* ── Google OAuth (wire up real flow here) ── */
  googleLogin(): void {
    console.log('Google Login triggered');
    // TODO: this.authService.googleLogin()
  }

  /* ── Microsoft SSO (wire up real flow here) ── */
  microsoftLogin(): void {
    console.log('Microsoft SSO triggered');
    // TODO: this.authService.microsoftLogin()
  }

  /* ── Navigation helpers ── */
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  goToplans(): void {
    this.router.navigate(['/plans']);
  }



  forgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  openPrivacy(): void {
    window.open('/privacy', '_blank');
  }

  openTerms(): void {
    window.open('/terms', '_blank');
  }

  openSupport(): void {
    window.open('/support', '_blank');
  }

}