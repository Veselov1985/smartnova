import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellsMultifilterComponent } from './sells-multifilter.component';

describe('SellsMultifilterComponent', () => {
  let component: SellsMultifilterComponent;
  let fixture: ComponentFixture<SellsMultifilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellsMultifilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellsMultifilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
