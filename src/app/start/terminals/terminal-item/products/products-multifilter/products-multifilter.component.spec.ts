import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMultifilterComponent } from './products-multifilter.component';

describe('ProductsMultifilterComponent', () => {
  let component: ProductsMultifilterComponent;
  let fixture: ComponentFixture<ProductsMultifilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsMultifilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsMultifilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
