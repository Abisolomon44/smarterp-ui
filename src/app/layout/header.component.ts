import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  isDark = false;

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.isDark = theme === 'dark' || document.body.classList.contains('dark-mode');
  }

  onThemeToggle() {
    this.isDark = !this.isDark;
    this.themeToggle.emit();
  }
}

