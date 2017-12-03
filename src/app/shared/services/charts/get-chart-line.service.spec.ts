import { TestBed, inject } from '@angular/core/testing';

import { GetChartLineService } from './get-chart-line.service';

describe('GetChartLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetChartLineService]
    });
  });

  it('should be created', inject([GetChartLineService], (service: GetChartLineService) => {
    expect(service).toBeTruthy();
  }));
});
