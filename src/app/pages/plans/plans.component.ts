import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, Plan } from '../../services/auth.service';

export interface CompareSection {
  label: string;
  rows: { label: string; values: (boolean | string)[] }[];
}

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];
  compareRows: CompareSection[] = [];
  isYearly = false;
  isLoading = false;
  errorMessage = '';

  /* Change this to the id of whichever plan should be highlighted */
  private readonly featuredPlanId = 2;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  /* ── Fetch plans from API ── */
  loadPlans(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getPlans().subscribe({
      next: (plans: Plan[]) => {
        this.plans = plans;
        this.compareRows = this.buildCompareRows(plans);
        this.isLoading = false;
      },

      error: (err: any) => {
        this.errorMessage =
          err?.error?.message ?? 'Failed to load plans. Please try again.';
        this.isLoading = false;
        console.error('Plans load error:', err);
      },
    });
  }
  goBack(): void {
    window.history.back();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  /* ── Toggle billing cycle ── */
  toggleBilling(): void {
    this.isYearly = !this.isYearly;
  }

  /* ── Price for the active billing cycle ── */
  getPrice(plan: Plan): number {
    if (plan.isTrial || plan.isCustom || plan.price === 0) return plan.price;
    return this.isYearly ? Math.round(plan.price * 0.8) : plan.price;
  }

  /* ── "Best Value" highlight — never touches Plan interface ── */
  isFeatured(plan: Plan): boolean {
    return plan.id === this.featuredPlanId;
  }

  /* ── Select plan and navigate ── */
  selectPlan(plan: Plan): void {
    if (plan.isCustom) {
      window.open(
        'mailto:sales@smarterp.com?subject=Enterprise Plan Enquiry',
        '_blank',
      );
      return;
    }

    localStorage.setItem(
      'selectedPlan',
      JSON.stringify({
        ...plan,
        billingCycle: this.isYearly ? 'yearly' : 'monthly',
        billingPrice: this.getPrice(plan),
      }),
    );

    this.router.navigate(['/register']);
  }

  retry(): void {
    this.loadPlans();
  }

  /* ── Build comparison table from live plan data ── */
  private buildCompareRows(plans: Plan[]): CompareSection[] {
    return [
      {
        label: 'Users & scale',
        rows: [
          {
            label: 'Max users',
            values: plans.map((p) =>
              p.maxUsers === -1 ? 'Unlimited' : String(p.maxUsers),
            ),
          },
          {
            label: 'Branches',
            values: plans.map((p) =>
              p.maxBranches === -1 ? 'Unlimited' : String(p.maxBranches),
            ),
          },
          {
            label: 'Storage',
            values: plans.map((p) =>
              p.storageLimitGB === -1 ? 'Unlimited' : p.storageLimitGB + ' GB',
            ),
          },
        ],
      },
      {
        label: 'CRM & sales',
        rows: [
          {
            label: 'Contact management',
            values: plans.map((): boolean | string => true),
          },
          {
            label: 'Sales pipeline',
            values: plans.map((p): boolean | string => !p.isTrial),
          },
        ],
      },
      {
        label: 'Operations',
        rows: [
          {
            label: 'Multi-warehouse',
            values: plans.map(
              (p): boolean | string =>
                p.isCustom ||
                (!p.isTrial && (p.maxBranches > 1 || p.maxBranches === -1)),
            ),
          },
          {
            label: 'HRM & payroll',
            values: plans.map((p): boolean | string => {
              if (p.isTrial) return false;
              if (p.isCustom) return true;
              return 'Add-on';
            }),
          },
          {
            label: 'AI analytics',
            values: plans.map(
              (p): boolean | string => p.isCustom || this.isFeatured(p),
            ),
          },
        ],
      },
    ];
  }
}
