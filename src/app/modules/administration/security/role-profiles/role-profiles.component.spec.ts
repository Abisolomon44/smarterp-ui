import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleProfilesComponent } from './role-profiles.component';

describe('RoleProfilesComponent', () => {
  let component: RoleProfilesComponent;
  let fixture: ComponentFixture<RoleProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
