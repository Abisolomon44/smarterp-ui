import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleProfilesComponent } from './module-profiles.component';

describe('ModuleProfilesComponent', () => {
  let component: ModuleProfilesComponent;
  let fixture: ComponentFixture<ModuleProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
