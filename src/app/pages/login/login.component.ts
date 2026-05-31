import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initGoogle();
  }

  private initGoogle() {
    if (typeof google === 'undefined') {
      setTimeout(() => this.initGoogle(), 100);
      return;
    }

    google.accounts.id.initialize({
      client_id: '633452252184-7ucro3c6f6bci51hkq6eoa704s265976.apps.googleusercontent.com',

      // 🔥 FINAL FIX FOR localhost (FedCM issue)
      use_fedcm_for_prompt: false,

      callback: (response: any) => {
        this.authService.googleLogin(response.credential).subscribe({
          next: (res: any) => {
            this.authService.saveToken(res.token);
            this.router.navigate(['/dashboard']);
          },
          error: () => alert('Google login failed')
        });
      }
    });
  }

  googleLogin() {
    google.accounts.id.prompt(); // ✅ Correct way
  }

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Invalid email or password')
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
