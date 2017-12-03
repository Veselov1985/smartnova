import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalIndicatorComponent } from './terminal-indicator.component';

describe('TerminalIndicatorComponent', () => {
  let component: TerminalIndicatorComponent;
  let fixture: ComponentFixture<TerminalIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
