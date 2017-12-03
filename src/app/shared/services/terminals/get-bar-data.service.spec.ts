import { TestBed, inject } from '@angular/core/testing';

import { GetBarDataService } from './get-bar-data.service';

describe('GetBarDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBarDataService]
    });
  });

  it('should be created', inject([GetBarDataService], (service: GetBarDataService) => {
    expect(service).toBeTruthy();
  }));
});
