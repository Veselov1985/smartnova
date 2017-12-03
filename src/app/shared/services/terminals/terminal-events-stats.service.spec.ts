import { TestBed, inject } from '@angular/core/testing';

import { GetEventsStatsService } from './terminal-events-stats.service';

describe('StatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetEventsStatsService]
    });
  });

  it('should be created', inject([GetEventsStatsService], (service: GetEventsStatsService) => {
    expect(service).toBeTruthy();
  }));
});
