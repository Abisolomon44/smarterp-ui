import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MasterService } from '../../services/master-service/master.service';
import { MasterDto } from '../model-dto/master';

export interface SelectedPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  billingPrice: number;
  isTrial: boolean;
  isCustom: boolean;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /* ── Form fields ── */
  companyName     = '';
  email           = '';
  phone           = '';
  userName        = '';
  password        = '';
  confirmPassword = '';

  /* ── IDs ── */
  planId = 0; countryId = 0; stateId = 0; cityId = 0;
  languageId = 0; currencyId = 0; businessTypeId = 0; industryTypeId = 0;

  /* ── Lists ── */
  countries: MasterDto[] = []; states: MasterDto[] = []; cities: MasterDto[] = [];
  languages: MasterDto[] = []; currencies: MasterDto[] = [];
  businessTypes: MasterDto[] = []; industryTypes: MasterDto[] = [];

  /* ── UI ── */
  errors        : { [key: string]: string } = {};
  isSubmitting  = false;
  showPassword  = false;
  showConfirm   = false;
  agreedToTerms = false;

  /** Active tab: 0=Organisation, 1=Location, 2=Security */
  activeTab = 0;

  selectedPlan: SelectedPlan | null = null;

  constructor(
    private authService  : AuthService,
    private masterService: MasterService,
    private router       : Router
  ) {}

  ngOnInit(): void {
    this.loadSelectedPlan();
    this.loadMasters();
  }

  loadSelectedPlan(): void {
    const raw = localStorage.getItem('selectedPlan');
    if (raw) {
      try { this.selectedPlan = JSON.parse(raw); this.planId = this.selectedPlan!.id; }
      catch { this.selectedPlan = null; }
    }
  }

  loadMasters(): void {
    this.masterService.getCountries()    .subscribe({ next: r => this.countries     = r });
    this.masterService.getLanguages()    .subscribe({ next: r => this.languages     = r });
    this.masterService.getCurrencies()   .subscribe({ next: r => this.currencies    = r });
    this.masterService.getBusinessTypes().subscribe({ next: r => this.businessTypes = r });
    this.masterService.getIndustryTypes().subscribe({ next: r => this.industryTypes = r });
  }

  onCountryChange(): void {
    this.stateId = 0; this.cityId = 0;
    this.masterService.getStates(this.countryId)
      .subscribe({ next: r => { this.states = r; this.cities = []; } });
  }

  onStateChange(): void {
    this.cityId = 0;
    this.masterService.getCities(this.stateId).subscribe({ next: r => this.cities = r });
  }

  /* ── Tab navigation ── */
  goTab(n: number): void { this.activeTab = n; }

  nextTab(): void {
    if (this.activeTab === 0 && !this.validateTab0()) return;
    if (this.activeTab < 2) this.activeTab++;
  }

  prevTab(): void { if (this.activeTab > 0) this.activeTab--; }

  /* ── Per-tab validation ── */
  validateTab0(): boolean {
    this.errors = {};
    if (!this.companyName.trim())   this.errors['companyName']    = 'Company Name is required';
    if (!this.userName.trim())      this.errors['userName']       = 'Admin Name is required';
    if (!this.email.trim())         this.errors['email']          = 'Email Address is required';
    else if (!this.isValidEmail(this.email)) this.errors['email'] = 'Please enter a valid email';
    if (!this.phone.trim())         this.errors['phone']          = 'Phone Number is required';
    if (this.businessTypeId === 0)  this.errors['businessTypeId'] = 'Business Type is required';
    if (this.industryTypeId === 0)  this.errors['industryTypeId'] = 'Industry Type is required';
    return Object.keys(this.errors).length === 0;
  }

  validateForm(): boolean {
    this.errors = {};
    if (!this.companyName.trim())    this.errors['companyName']     = 'Company Name is required';
    if (!this.userName.trim())       this.errors['userName']        = 'Admin Name is required';
    if (!this.email.trim())          this.errors['email']           = 'Email Address is required';
    else if (!this.isValidEmail(this.email)) this.errors['email']   = 'Please enter a valid email';
    if (!this.phone.trim())          this.errors['phone']           = 'Phone Number is required';
    if (this.countryId === 0)        this.errors['countryId']       = 'Country is required';
    if (this.businessTypeId === 0)   this.errors['businessTypeId']  = 'Business Type is required';
    if (this.industryTypeId === 0)   this.errors['industryTypeId']  = 'Industry Type is required';
    if (!this.password.trim())       this.errors['password']        = 'Password is required';
    else if (this.password.length < 6) this.errors['password']      = 'Min 6 characters';
    if (!this.confirmPassword.trim()) this.errors['confirmPassword'] = 'Confirm Password is required';
    else if (this.password !== this.confirmPassword) this.errors['confirmPassword'] = 'Passwords do not match';
    return Object.keys(this.errors).length === 0;
  }

  isValidEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
  getFieldError(f: string): string  { return this.errors[f] || ''; }
  hasFieldError(f: string): boolean { return !!this.errors[f]; }

  register(): void {
    if (!this.validateForm()) return;
    this.isSubmitting = true;
    const payload = {
      companyName: this.companyName, email: this.email, phone: this.phone,
      countryId: this.countryId, stateId: this.stateId, cityId: this.cityId,
      languageId: this.languageId, currencyId: this.currencyId,
      businessTypeId: this.businessTypeId, industryTypeId: this.industryTypeId,
      userName: this.userName, password: this.password, planId: this.planId
    };
    this.authService.register(payload).subscribe({
      next: () => {
        localStorage.removeItem('selectedPlan');
        alert('Company Registered Successfully');
        this.router.navigate(['/login']);
      },
      error: err => { console.error(err); alert('Registration Failed'); this.isSubmitting = false; }
    });
  }

  goToLogin(): void { this.router.navigate(['/login']); }
  goToPlans(): void { this.router.navigate(['/plans']); }

  goBack(): void {
  window.history.back();
}


}