import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesComponent } from './countries.component';
import { MasterService } from '../../../../services/master-service/master.service';
import { AlertService } from '../../../../services/alert.service';
import { of } from 'rxjs';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let masterService: jasmine.SpyObj<MasterService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    const masterServiceSpy = jasmine.createSpyObj('MasterService', ['getCountries', 'saveCountry']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['success', 'error', 'confirm']);

    await TestBed.configureTestingModule({
      imports: [CountriesComponent],
      providers: [
        { provide: MasterService, useValue: masterServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    masterService = TestBed.inject(MasterService) as jasmine.SpyObj<MasterService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', () => {
    masterService.getCountries.and.returnValue(of({ data: [] }));
    fixture.detectChanges();
    expect(masterService.getCountries).toHaveBeenCalled();
  });

  it('should create new country', () => {
    component.createCountry();
    expect(component.showEntry).toBe(true);
    expect(component.countryModel.id).toBe(0);
  });

  it('should edit country', () => {
    const country = { id: 1, name: 'USA', code: 'US', isActive: true };
    component.editCountry(country);
    expect(component.showEntry).toBe(true);
    expect(component.countryModel.id).toBe(1);
  });

  it('should validate required fields before save', () => {
    component.countryModel.name = '';
    component.saveCountry();
    expect(alertService.error).toHaveBeenCalledWith('Please enter country name');
  });

  it('should cancel edit', () => {
    component.showEntry = true;
    component.cancel();
    expect(component.showEntry).toBe(false);
  });
});
