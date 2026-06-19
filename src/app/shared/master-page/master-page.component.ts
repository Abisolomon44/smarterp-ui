import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ICONS } from '../icon.constants';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss'],
})
export class MasterPageComponent {
  hasTabErrors(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  // ==========================================
  // ICONS
  // ==========================================

  icons = ICONS;
  validationErrors: Record<string, string> = {};
  showPassword = false;
canView = false;
canCreate = false;
canEdit = false;
canDelete = false;
canApprove = false;
canPrint = false;
canExport = false;
  passwordVisibility: Record<string, boolean> = {};
  // ==========================================
  // INPUTS
  // ==========================================

  @Input() config: any = {};

  @Input() data: any[] = [];

  @Input() userModel: any = {};

  @Input() loading = false;

  @Input() showEntry = false;

  // ==========================================
  // OUTPUTS
  // ==========================================

  @Output() createClick = new EventEmitter<void>();

  @Output() editClick = new EventEmitter<any>();

  @Output() deleteClick = new EventEmitter<any>();

  @Output() saveClick = new EventEmitter<any>();

  @Output() refreshClick = new EventEmitter<void>();

  @Output() cancelClick = new EventEmitter<void>();

  constructor(
    private exportService: ExportService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');

    const permission = permissions.find(
      (x: any) => x.subModuleName === this.config.permissionName,
    );

    if (permission) {
      this.canView = permission.canView;

      this.canCreate = permission.canCreate;

      this.canEdit = permission.canEdit;

      this.canDelete = permission.canDelete;

      this.canApprove = permission.canApprove;

      this.canPrint = permission.canPrint;

      this.canExport = permission.canExport;
    }
  }

  // ==========================================
  // VARIABLES
  // ==========================================

  searchText = '';

  selectedId = 0;
  showExportMenu = false;

  activeTab = 'General';

  allSelected = false;

  selectedRows: any[] = [];

  currentPage = 1;

  pageSize = 10;

  pageSizes = [10, 25, 50, 100];

  // ==========================================
  // SEARCH
  // ==========================================

  get filteredData(): any[] {
    if (!this.searchText) {
      return this.data;
    }

    const keyword = this.searchText.toLowerCase();

    return this.data.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(keyword),
    );
  }

  goBack(): void {
    this.location.back();
  }
  // ==========================================
  // PAGINATION
  // ==========================================

  get paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredData.slice(start, start + this.pageSize);
  }
  exportExcel(): void {
    this.exportService.exportExcel(this.filteredData, this.config.title);
  }

  exportCsv(): void {
    this.exportService.exportCsv(this.filteredData, this.config.title);
  }

  exportPdf(): void {
    this.exportService.exportPdf(this.filteredData, this.config.title);
  }
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  changePageSize(): void {
    this.currentPage = 1;
  }

  // ==========================================
  // SELECT ALL
  // ==========================================

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;

    this.paginatedData.forEach((row) => {
      row.selected = this.allSelected;
    });

    this.updateSelectedRows();
  }

  toggleRowSelection(): void {
    this.updateSelectedRows();

    this.allSelected =
      this.paginatedData.length > 0 &&
      this.paginatedData.every((x) => x.selected);
  }

  updateSelectedRows(): void {
    this.selectedRows = this.data.filter((x) => x.selected);
  }

  // ==========================================
  // CREATE
  // ==========================================

  create(): void {
    this.selectedId = 0;

    this.createClick.emit();
  }

  // ==========================================
  // EDIT
  // ==========================================

  edit(row: any): void {
    this.selectedId = row?.id || 0;

    this.editClick.emit(row);
  }

  // ==========================================
  // DELETE
  // ==========================================

  delete(row: any): void {
    this.deleteClick.emit(row);
  }

  deleteSelected(): void {
    this.selectedRows.forEach((row) => {
      this.deleteClick.emit(row);
    });
  }

  // ==========================================
  // SAVE
  // ==========================================
  save(): void {
    if (!this.validateForm()) {
      return;
    }

    this.saveClick.emit(this.userModel);
  }

  // ==========================================
  // CANCEL
  // ==========================================

  cancel(): void {
    this.cancelClick.emit();
  }

  // ==========================================
  // REFRESH
  // ==========================================

  refresh(): void {
    this.refreshClick.emit();
  }

  // ==========================================
  // TABS
  // ==========================================

  setTab(tabName: string): void {
    this.activeTab = tabName;
  }

  get currentTab(): any {
    return this.config?.tabs?.find((tab: any) => tab.name === this.activeTab);
  }

  get currentTabFields(): any[] {
    if (!this.currentTab) {
      return [];
    }

    return this.config.fields.filter((field: any) =>
      this.currentTab.fields.includes(field.name),
    );
  }
  validateField(field: any): string {
    const value = this.userModel[field.name];

    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required.`;
    }

    if (field.minLength && value && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters.`;
    }

    if (field.maxLength && value && value.length > field.maxLength) {
      return `${field.label} cannot exceed ${field.maxLength} characters.`;
    }

    return '';
  }

  validateForm(): boolean {
    this.validationErrors = {};

    let firstInvalidField = '';

    this.config.fields.forEach((field: any) => {
      const error = this.validateField(field);

      if (error) {
        this.validationErrors[field.name] = error;

        if (!firstInvalidField) {
          firstInvalidField = field.name;
        }
      }
    });

    if (firstInvalidField) {
      this.navigateToFieldTab(firstInvalidField);

      return false;
    }

    return true;
  }
  navigateToFieldTab(fieldName: string): void {
    const tab = this.config.tabs.find((t: any) => t.fields.includes(fieldName));

    if (tab) {
      this.activeTab = tab.name;
    }
  }
  allowKeyPress(event: KeyboardEvent, keyType: string): void {
    const key = event.key;

    switch (keyType) {
      case 'number':
        if (!/^[0-9]$/.test(key)) {
          event.preventDefault();
        }

        break;

      case 'alphabet':
        if (!/^[a-zA-Z ]$/.test(key)) {
          event.preventDefault();
        }

        break;

      case 'alphanumeric':
        if (!/^[a-zA-Z0-9 ]$/.test(key)) {
          event.preventDefault();
        }

        break;
    }
  }

  copyData(): void {
    const text = JSON.stringify(this.filteredData, null, 2);

    navigator.clipboard.writeText(text).then(() => {
      console.log('Data copied');
    });
  }
}
