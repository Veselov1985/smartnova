import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLoggingComponent } from './report-logging.component';

describe('ReportLoggingComponent', () => {
  let component: ReportLoggingComponent;
  let fixture: ComponentFixture<ReportLoggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLoggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
