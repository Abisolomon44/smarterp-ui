import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleProfileRoleComponent } from './role-profile-role.component';

describe('RoleProfileRoleComponent', () => {
  let component: RoleProfileRoleComponent;
  let fixture: ComponentFixture<RoleProfileRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleProfileRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleProfileRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
