import { TestBed, inject } from '@angular/core/testing';

import { TerminalsService } from './terminals.service';

describe('TerminalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalsService]
    });
  });

  it('should ...', inject([TerminalsService], (service: TerminalsService) => {
    expect(service).toBeTruthy();
  }));
});
