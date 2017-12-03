import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsConfiguratorComponent } from './products-configurator.component';

describe('ProductsConfiguratorComponent', () => {
  let component: ProductsConfiguratorComponent;
  let fixture: ComponentFixture<ProductsConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
