import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesComponent } from './cities.component';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load states on init', () => {
    expect(component.config.fields).toBeDefined();
  });

  it('should load cities on init', () => {
    expect(component.cities).toBeDefined();
  });

  it('should create new city with empty model', () => {
    component.createCity();
    expect(component.cityModel.id).toBe(0);
    expect(component.showEntry).toBe(true);
  });

  it('should edit city with selected data', () => {
    const mockCity = {
      id: 1,
      name: 'New York',
      code: 'NY',
      stateId: 1,
      isActive: true
    };
    component.editCity(mockCity);
    expect(component.cityModel).toEqual(mockCity);
    expect(component.showEntry).toBe(true);
  });

  it('should cancel entry', () => {
    component.showEntry = true;
    component.cancel();
    expect(component.showEntry).toBe(false);
  });
});
