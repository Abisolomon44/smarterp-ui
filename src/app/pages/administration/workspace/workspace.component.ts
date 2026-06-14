import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  getIconByName
} from '../../../shared/icon.constants';
import {
  LucideAngularModule
} from 'lucide-angular';

import { Router } from '@angular/router';

import { ICONS }
from '../../../shared/icon.constants';

import { AdministrationService }
from '../../../services/administration-service/administration.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent
  implements OnInit {

  readonly icons = ICONS;

  dashboard: any;

  domainGroups: any[] = [];

  constructor(
    private administrationService:
      AdministrationService,
    private router:
      Router
  ) { }

  ngOnInit(): void {

    this.loadDashboard();

    this.loadWorkspaceMenus();
  }

  goBack(): void {

    this.router.navigate([
      '/dashboard'
    ]);
  }

  loadDashboard(): void {

    this.administrationService
      .getAdminDashboard()
      .subscribe({
        next: (response) => {

          this.dashboard =
            response;
        },
        error: (error) => {

          console.error(
            error
          );
        }
      });
  }

  loadWorkspaceMenus(): void {

    const userId =
      Number(
        localStorage.getItem(
          'userId'
        )
      );

    this.administrationService
      .getSidebar(userId)
      .subscribe({
        next: (response: any) => {

          const menus =
            response.data ??
            response;

          this.buildDomainGroups(
            menus
          );
        },
        error: (error) => {

          console.error(
            error
          );
        }
      });
  }

buildDomainGroups(
  menus: any[]
): void {

  const domains =
    [...new Set(
      menus.map(
        (x: any) => x.domainName
      )
    )];

  this.domainGroups =
    domains.map(
      (domain: string) => {

        const domainMenus =
          menus.filter(
            (x: any) =>
              x.domainName === domain
          );

        return {

          domainName:
            domain,

          domainIcon:
            getIconByName(
              domainMenus[0]
                ?.domainIcon
            ),

          cards:
            domainMenus.map(
              (x: any) => ({

                title:
                  x.moduleName,

                description:
                  `Manage ${x.moduleName}`,

                route:
                  x.routeUrl,

                icon:
                  getIconByName(
                    x.moduleIcon
                  ),

                iconClass:
                  'module'
              })
            )
        };
      }
    );
}
}