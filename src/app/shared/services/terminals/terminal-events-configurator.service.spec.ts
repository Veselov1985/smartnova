import { TestBed, inject } from '@angular/core/testing';

import { TerminalEventsConfiguratorService } from './terminal-events-configurator.service';

describe('TerminalEventsConfiguratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalEventsConfiguratorService]
    });
  });

  it('should be created', inject([TerminalEventsConfiguratorService], (service: TerminalEventsConfiguratorService) => {
    expect(service).toBeTruthy();
  }));
});
