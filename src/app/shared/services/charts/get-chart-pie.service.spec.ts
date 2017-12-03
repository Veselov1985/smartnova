import { TestBed, inject } from '@angular/core/testing';

import { GetChartPieService } from './get-chart-pie.service';

describe('GetChartPieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetChartPieService]
    });
  });

  it('should be created', inject([GetChartPieService], (service: GetChartPieService) => {
    expect(service).toBeTruthy();
  }));
});
