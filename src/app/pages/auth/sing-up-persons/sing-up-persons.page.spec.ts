import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpPersonsPage } from './sing-up-persons.page';

describe('SingUpPersonsPage', () => {
  let component: SingUpPersonsPage;
  let fixture: ComponentFixture<SingUpPersonsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingUpPersonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
