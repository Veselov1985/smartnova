import { TestBed, inject } from '@angular/core/testing';

import { ChartMainService } from './chart-main.service';

describe('ChartMainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartMainService]
    });
  });

  it('should be created', inject([ChartMainService], (service: ChartMainService) => {
    expect(service).toBeTruthy();
  }));
});
