import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesComponent } from './currencies.component';

describe('CurrenciesComponent', () => {
  let component: CurrenciesComponent;
  let fixture: ComponentFixture<CurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load currencies on init', () => {
    expect(component.currencies).toBeDefined();
  });

  it('should create new currency with empty model', () => {
    component.createCurrency();
    expect(component.currencyModel.id).toBe(0);
    expect(component.showEntry).toBe(true);
  });

  it('should edit currency with selected data', () => {
    const mockCurrency = {
      id: 1,
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      isActive: true
    };
    component.editCurrency(mockCurrency);
    expect(component.currencyModel).toEqual(mockCurrency);
    expect(component.showEntry).toBe(true);
  });

  it('should cancel entry', () => {
    component.showEntry = true;
    component.cancel();
    expect(component.showEntry).toBe(false);
  });
});
