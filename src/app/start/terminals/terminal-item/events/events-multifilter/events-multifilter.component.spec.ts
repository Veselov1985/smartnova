import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMultifilterComponent } from './events-multifilter.component';

describe('EventsMultifilterComponent', () => {
  let component: EventsMultifilterComponent;
  let fixture: ComponentFixture<EventsMultifilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsMultifilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsMultifilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
