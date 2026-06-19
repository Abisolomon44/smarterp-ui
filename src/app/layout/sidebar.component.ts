import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AdministrationService }
from '../services/administration-service/administration.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent
  implements OnInit {

  @Input()
  collapsed = false;

  @Output()
  close =
    new EventEmitter<void>();

  workspaces: any[] = [];

  userId = Number(
    localStorage.getItem('userId')
  );

  userName =
    localStorage.getItem(
      'userName'
    ) || 'Administrator';

  constructor(
    private administrationService:
      AdministrationService
  ) { }

  ngOnInit(): void {

    this.loadWorkspaces();
  }

  loadWorkspaces(): void {

    this.administrationService
      .getSidebarWorkspaces(
        this.userId
      )
      .subscribe({

        next: (response: any) => {

          this.workspaces =
            response?.data ??
            response ??
            [];

          console.log(
            'Sidebar Workspaces',
            this.workspaces
          );
        },

        error: (error) => {

          console.error(
            'Sidebar Error',
            error
          );
        }
      });
  }

  navClick(
    event: MouseEvent
  ): void {

    if (
      window.innerWidth <= 920
    ) {

      this.close.emit();
    }
  }

  trackByWorkspace(
    index: number,
    item: any
  ): number {

    return item.workspaceId;
  }
}