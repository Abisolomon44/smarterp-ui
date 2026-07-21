import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndustryTypesComponent } from './industry-types.component';
import { MasterService } from '../../../../services/master-service/master.service';
import { AlertService } from '../../../../services/alert.service';
import { of } from 'rxjs';

describe('IndustryTypesComponent', () => {
  let component: IndustryTypesComponent;
  let fixture: ComponentFixture<IndustryTypesComponent>;
  let masterService: jasmine.SpyObj<MasterService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    const masterServiceSpy = jasmine.createSpyObj('MasterService', ['getIndustryTypes', 'saveIndustryType']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['success', 'error', 'confirm']);

    await TestBed.configureTestingModule({
      imports: [IndustryTypesComponent],
      providers: [
        { provide: MasterService, useValue: masterServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    masterService = TestBed.inject(MasterService) as jasmine.SpyObj<MasterService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;

    fixture = TestBed.createComponent(IndustryTypesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load industry types on init', () => {
    masterService.getIndustryTypes.and.returnValue(of({ data: [] }));
    fixture.detectChanges();
    expect(masterService.getIndustryTypes).toHaveBeenCalled();
  });

  it('should create new industry type', () => {
    component.createIndustryType();
    expect(component.showEntry).toBe(true);
    expect(component.industryTypeModel.id).toBe(0);
  });

  it('should edit industry type', () => {
    const industryType = { id: 1, name: 'Technology', code: 'IT', isActive: true };
    component.editIndustryType(industryType);
    expect(component.showEntry).toBe(true);
    expect(component.industryTypeModel.id).toBe(1);
  });

  it('should validate required fields before save', () => {
    component.industryTypeModel.name = '';
    component.saveIndustryType();
    expect(alertService.error).toHaveBeenCalledWith('Please enter industry type name');
  });

  it('should cancel edit', () => {
    component.showEntry = true;
    component.cancel();
    expect(component.showEntry).toBe(false);
  });
});
