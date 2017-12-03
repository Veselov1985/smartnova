import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStartComponent } from './header-start.component';

describe('HeaderStartComponent', () => {
  let component: HeaderStartComponent;
  let fixture: ComponentFixture<HeaderStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
