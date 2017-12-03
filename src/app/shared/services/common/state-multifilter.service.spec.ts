import { TestBed, inject } from '@angular/core/testing';

import { StateMultifilterService } from './state-multifilter.service';

describe('StateMultifilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateMultifilterService]
    });
  });

  it('should be created', inject([StateMultifilterService], (service: StateMultifilterService) => {
    expect(service).toBeTruthy();
  }));
});
