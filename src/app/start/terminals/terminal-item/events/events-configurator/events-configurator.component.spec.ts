import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsConfiguratorComponent } from './events-configurator.component';

describe('EventsConfiguratorComponent', () => {
  let component: EventsConfiguratorComponent;
  let fixture: ComponentFixture<EventsConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
