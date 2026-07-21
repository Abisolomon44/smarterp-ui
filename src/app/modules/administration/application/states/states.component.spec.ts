import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesComponent } from './states.component';

describe('StatesComponent', () => {
  let component: StatesComponent;
  let fixture: ComponentFixture<StatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', () => {
    expect(component.config.fields).toBeDefined();
  });

  it('should load states on init', () => {
    expect(component.states).toBeDefined();
  });

  it('should create new state with empty model', () => {
    component.createState();
    expect(component.stateModel.id).toBe(0);
    expect(component.showEntry).toBe(true);
  });

  it('should edit state with selected data', () => {
    const mockState = {
      id: 1,
      name: 'California',
      code: 'CA',
      countryId: 1,
      isActive: true
    };
    component.editState(mockState);
    expect(component.stateModel).toEqual(mockState);
    expect(component.showEntry).toBe(true);
  });

  it('should cancel entry', () => {
    component.showEntry = true;
    component.cancel();
    expect(component.showEntry).toBe(false);
  });
});
