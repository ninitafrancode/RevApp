import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpCompaniesPage } from './sing-up-companies.page';

describe('SingUpCompaniesPage', () => {
  let component: SingUpCompaniesPage;
  let fixture: ComponentFixture<SingUpCompaniesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingUpCompaniesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
