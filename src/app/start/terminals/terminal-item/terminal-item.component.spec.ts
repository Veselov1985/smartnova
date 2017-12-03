import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalItemComponent } from './terminal-item.component';

describe('TerminalItemComponent', () => {
  let component: TerminalItemComponent;
  let fixture: ComponentFixture<TerminalItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
