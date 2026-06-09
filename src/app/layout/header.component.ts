import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// ✦ NEW: import your AuthService
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle       = new EventEmitter<void>();
  @Output() themeToggle  = new EventEmitter<void>();

  isDark = false;

  constructor(
    private router:      Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.isDark =
      theme === 'dark' ||
      document.body.classList.contains('dark-mode');
  }

  onThemeToggle(): void {
    this.isDark = !this.isDark;
    this.themeToggle.emit();
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', this.isDark);
  }

  // ✦ NEW: logout method
  onLogout(): void {
    this.authService.logout();          // clear token / session
    this.router.navigate(['/login']);   // redirect to login
  }
}