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

  constructor(
    private administrationService:
      AdministrationService
  ) { }

  @Input() collapsed = false;

  @Output() close =
    new EventEmitter<void>();

  workspaces: any[] = [];

  userName =
    localStorage.getItem(
      'userName'
    ) || 'Administrator';

  ngOnInit(): void {

    this.loadWorkspaces();
  }

  loadWorkspaces(): void {

    const userId =
      Number(
        localStorage.getItem(
          'userId'
        )
      );

    this.administrationService
      .getSidebarWorkspaces(
        userId
      )
      .subscribe({
        next: (response: any) => {

          this.workspaces =
            response.data ??
            response;

          console.log(
            'Workspaces',
            this.workspaces
          );
        },
        error: (error) => {

          console.error(
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
}