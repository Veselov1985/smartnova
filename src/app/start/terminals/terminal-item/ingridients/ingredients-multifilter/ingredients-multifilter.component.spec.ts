import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsMultifilterComponent } from './ingredients-multifilter.component';

describe('IngredientsMultifilterComponent', () => {
  let component: IngredientsMultifilterComponent;
  let fixture: ComponentFixture<IngredientsMultifilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsMultifilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsMultifilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
