import { TestBed, inject } from '@angular/core/testing';

import { GetChartEventStatsService } from './get-chart-stats.service';

describe('GetChartStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetChartEventStatsService]
    });
  });

  it('should be created', inject([GetChartEventStatsService], (service: GetChartEventStatsService) => {
    expect(service).toBeTruthy();
  }));
});
