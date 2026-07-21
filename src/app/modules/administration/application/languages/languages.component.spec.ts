import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesComponent } from './languages.component';

describe('LanguagesComponent', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load languages on init', () => {
    expect(component.languages).toBeDefined();
  });

  it('should create new language with empty model', () => {
    component.createLanguage();
    expect(component.languageModel.id).toBe(0);
    expect(component.showEntry).toBe(true);
  });

  it('should edit language with selected data', () => {
    const mockLanguage = {
      id: 1,
      name: 'English',
      code: 'en',
      isActive: true
    };
    component.editLanguage(mockLanguage);
    expect(component.languageModel).toEqual(mockLanguage);
    expect(component.showEntry).toBe(true);
  });

  it('should cancel entry', () => {
    component.showEntry = true;
    component.cancel();
    expect(component.showEntry).toBe(false);
  });
});
