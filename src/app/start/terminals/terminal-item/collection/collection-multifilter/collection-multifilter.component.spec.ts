import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionMultifilterComponent } from './collection-multifilter.component';

describe('CollectionMultifilterComponent', () => {
  let component: CollectionMultifilterComponent;
  let fixture: ComponentFixture<CollectionMultifilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionMultifilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionMultifilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
