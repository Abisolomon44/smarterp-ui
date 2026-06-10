import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleProfileRolesComponent } from './role-profile-roles.component';

describe('RoleProfileRolesComponent', () => {
  let component: RoleProfileRolesComponent;
  let fixture: ComponentFixture<RoleProfileRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleProfileRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleProfileRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
