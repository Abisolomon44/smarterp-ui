import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() close = new EventEmitter<void>();

  navClick(event: MouseEvent) {
    // close overlay on small screens after navigation
    if (window.innerWidth <= 920) {
      this.close.emit();
    }
  }
}

