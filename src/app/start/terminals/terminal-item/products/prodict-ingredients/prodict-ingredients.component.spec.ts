import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdictIngredientsComponent } from './prodict-ingredients.component';

describe('ProdictIngredientsComponent', () => {
  let component: ProdictIngredientsComponent;
  let fixture: ComponentFixture<ProdictIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdictIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdictIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
