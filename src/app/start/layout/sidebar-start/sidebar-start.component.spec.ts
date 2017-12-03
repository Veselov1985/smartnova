import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarStartComponent } from './sidebar-start.component';

describe('SidebarStartComponent', () => {
  let component: SidebarStartComponent;
  let fixture: ComponentFixture<SidebarStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
