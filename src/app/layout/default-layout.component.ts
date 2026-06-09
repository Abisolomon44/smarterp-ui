import {
  Component,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';

import {
  Router,
  NavigationEnd,
  RouterOutlet
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent
  implements OnInit, OnDestroy {

  isCollapsed = false;
  sidebarOpen = false;

  // Breadcrumb Page Name
  currentPage = 'Dashboard';

  private routerSub?: Subscription;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadTheme();

    // Initial breadcrumb load
    this.updateCurrentPage();

    this.routerSub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        // Update breadcrumb
        this.updateCurrentPage();

        // Close mobile sidebar after navigation
        if (window.innerWidth <= 920) {
          this.closeSidebarOverlay();
        }

      });

  }

  private updateCurrentPage(): void {

    const segments = this.router.url
      .split('/')
      .filter(segment => segment);

    this.currentPage =
      segments.length > 1
        ? this.formatPageName(
            segments[segments.length - 1]
          )
        : 'Dashboard';

  }

  private formatPageName(
    text: string
  ): string {

    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char =>
        char.toUpperCase()
      );

  }

  private loadTheme(): void {

    const theme =
      localStorage.getItem('theme');

    if (theme === 'dark') {

      document.body.classList.add(
        'dark-mode'
      );

    } else {

      document.body.classList.remove(
        'dark-mode'
      );

    }

  }

  toggleTheme(): void {

    const darkMode =
      document.body.classList.toggle(
        'dark-mode'
      );

    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light'
    );

  }

  onToggle(): void {

    const isMobile =
      window.innerWidth <= 920;

    if (isMobile) {

      this.sidebarOpen =
        !this.sidebarOpen;

      console.log(
        'Sidebar Mobile:',
        this.sidebarOpen
      );

    } else {

      this.isCollapsed =
        !this.isCollapsed;

      console.log(
        'Sidebar Collapsed:',
        this.isCollapsed
      );

    }

  }

  closeSidebarOverlay(): void {

    this.sidebarOpen = false;

  }

  @HostListener('window:resize')
  onResize(): void {

    if (window.innerWidth > 920) {

      this.sidebarOpen = false;

    }

  }

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.sidebarOpen) {

      this.closeSidebarOverlay();

    }

  }

  ngOnDestroy(): void {

    this.routerSub?.unsubscribe();

  }

}