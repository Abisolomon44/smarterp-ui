import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessTypesComponent } from './business-types.component';
import { MasterService } from '../../../../services/master-service/master.service';
import { AlertService } from '../../../../services/alert.service';
import { of } from 'rxjs';

describe('BusinessTypesComponent', () => {
  let component: BusinessTypesComponent;
  let fixture: ComponentFixture<BusinessTypesComponent>;
  let masterService: jasmine.SpyObj<MasterService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    const masterServiceSpy = jasmine.createSpyObj('MasterService', ['getBusinessTypes', 'saveBusinessType']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['success', 'error', 'confirm']);

    await TestBed.configureTestingModule({
      imports: [BusinessTypesComponent],
      providers: [
        { provide: MasterService, useValue: masterServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    masterService = TestBed.inject(MasterService) as jasmine.SpyObj<MasterService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;

    fixture = TestBed.createComponent(BusinessTypesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load business types on init', () => {
    masterService.getBusinessTypes.and.returnValue(of({ data: [] }));
    fixture.detectChanges();
    expect(masterService.getBusinessTypes).toHaveBeenCalled();
  });

  it('should create new business type', () => {
    component.createBusinessType();
    expect(component.showEntry).toBe(true);
    expect(component.businessTypeModel.id).toBe(0);
  });

  it('should edit business type', () => {
    const businessType = { id: 1, name: 'Retail', code: 'RET', isActive: true };
    component.editBusinessType(businessType);
    expect(component.showEntry).toBe(true);
    expect(component.businessTypeModel.id).toBe(1);
  });

  it('should validate required fields before save', () => {
    component.businessTypeModel.name = '';
    component.saveBusinessType();
    expect(alertService.error).toHaveBeenCalledWith('Please enter business type name');
  });

  it('should cancel edit', () => {
    component.showEntry = true;
    component.cancel();
    expect(component.showEntry).toBe(false);
  });
});
