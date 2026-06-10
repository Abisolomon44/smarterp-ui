import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDomainsComponent } from './role-domains.component';

describe('RoleDomainsComponent', () => {
  let component: RoleDomainsComponent;
  let fixture: ComponentFixture<RoleDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDomainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
