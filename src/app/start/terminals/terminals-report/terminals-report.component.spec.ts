import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalsReportComponent } from './terminals-report.component';

describe('TerminalsReportComponent', () => {
  let component: TerminalsReportComponent;
  let fixture: ComponentFixture<TerminalsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
