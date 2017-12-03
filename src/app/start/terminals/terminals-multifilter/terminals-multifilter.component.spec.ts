import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalsMultifilterComponent } from './terminals-multifilter.component';

describe('TerminalsMultifilterComponent', () => {
  let component: TerminalsMultifilterComponent;
  let fixture: ComponentFixture<TerminalsMultifilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalsMultifilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsMultifilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
