import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingUpPreviewPage } from './sing-up-preview.page';

describe('SingUpPreviewPage', () => {
  let component: SingUpPreviewPage;
  let fixture: ComponentFixture<SingUpPreviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingUpPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
