import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleWorkspacesComponent } from './role-workspaces.component';

describe('RoleWorkspacesComponent', () => {
  let component: RoleWorkspacesComponent;
  let fixture: ComponentFixture<RoleWorkspacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleWorkspacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
