import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy{
  isCollapsed = false;
  sidebarOpen = false;
  private routerSub?: Subscription;
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') document.body.classList.add('dark-mode');

    // Close overlay sidebar after navigation on mobile
    try {
      // Router is optional during unit tests so guard
      this.routerSub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        if (this.sidebarOpen) this.closeSidebarOverlay();
      });
    } catch (e) {
      // ignore if router not available
    }
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  onToggle() {
    // On small screens open overlay sidebar, otherwise collapse
    if (window.innerWidth <= 920) {
      this.sidebarOpen = !this.sidebarOpen;
      document.body.classList.toggle('sidebar-open', this.sidebarOpen);
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  closeSidebarOverlay() {
    this.sidebarOpen = false;
    document.body.classList.remove('sidebar-open');
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(ev: Event) {
    if (this.sidebarOpen) this.closeSidebarOverlay();
  }
}
