import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSubModulesComponent } from './role-sub-modules.component';

describe('RoleSubModulesComponent', () => {
  let component: RoleSubModulesComponent;
  let fixture: ComponentFixture<RoleSubModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleSubModulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSubModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
