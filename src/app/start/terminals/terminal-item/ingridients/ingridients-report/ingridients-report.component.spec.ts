import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngridientsReportComponent } from './ingridients-report.component';

describe('IngridientsReportComponent', () => {
  let component: IngridientsReportComponent;
  let fixture: ComponentFixture<IngridientsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngridientsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngridientsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
