import { TestBed, inject } from '@angular/core/testing';

import { TerminalSellsService } from './terminal-sells.service';

describe('TerminalSellsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalSellsService]
    });
  });

  it('should be created', inject([TerminalSellsService], (service: TerminalSellsService) => {
    expect(service).toBeTruthy();
  }));
});
