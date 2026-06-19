import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import {
  LucideAngularModule
} from 'lucide-angular';

import {
  ICONS,
  getIconByName
} from '../../../shared/icon.constants';

import {
  AdministrationService
} from '../../../services/administration-service/administration.service';

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

  loading = false;

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

    this.loading = true;

    this.administrationService
      .getSidebar(
        userId
      )
      .subscribe({

        next: (response: any) => {

          const menus =
            response?.data ??
            response ??
            [];

          console.log(
            'Workspace Menus',
            menus
          );

          this.buildDomainGroups(
            menus
          );

          this.loading = false;
        },

        error: (error) => {

          console.error(
            error
          );

          this.loading = false;
        }
      });
  }

  buildDomainGroups(
    menus: any[]
  ): void {

    const grouped =
      menus.reduce(
        (
          result: any,
          item: any
        ) => {

          if (
            !result[item.domainName]
          ) {

            result[item.domainName] = {

              domainName:
                item.domainName,

              domainIcon:
                getIconByName(
                  item.domainIcon
                ),

              cards: []
            };
          }

          result[
            item.domainName
          ].cards.push({

            moduleId:
              item.moduleId,

            subModuleId:
              item.subModuleId,

            title:
              item.moduleName,

            description:
              `Manage ${item.moduleName}`,

            route:
              item.routeUrl,

            icon:
              getIconByName(
                item.moduleIcon
              ),

            iconClass:
              'module'
          });

          return result;

        },
        {}
      );

    this.domainGroups =
      Object.values(
        grouped
      );
  }

  trackByDomain(
    index: number,
    item: any
  ): string {

    return item.domainName;
  }

  trackByCard(
    index: number,
    item: any
  ): number {

    return item.moduleId;
  }
}