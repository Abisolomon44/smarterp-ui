import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleProfileModulesComponent } from './module-profile-modules.component';

describe('ModuleProfileModulesComponent', () => {
  let component: ModuleProfileModulesComponent;
  let fixture: ComponentFixture<ModuleProfileModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleProfileModulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleProfileModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
