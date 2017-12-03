import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalTabsComponent } from './terminal-tabs.component';

describe('TerminalTabsComponent', () => {
  let component: TerminalTabsComponent;
  let fixture: ComponentFixture<TerminalTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
