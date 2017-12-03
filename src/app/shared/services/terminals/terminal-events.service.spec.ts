import { TestBed, inject } from '@angular/core/testing';

import { TerminalEventsService } from './terminal-events.service';

describe('TerminalEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalEventsService]
    });
  });

  it('should be created', inject([TerminalEventsService], (service: TerminalEventsService) => {
    expect(service).toBeTruthy();
  }));
});
