import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsConfiguratorComponent } from './ingredients-configurator.component';

describe('IngredientsConfiguratorComponent', () => {
  let component: IngredientsConfiguratorComponent;
  let fixture: ComponentFixture<IngredientsConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
