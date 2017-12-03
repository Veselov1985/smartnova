import { TestBed, inject } from '@angular/core/testing';

import { TerminalIngridientsService } from './terminal-ingridients.service';

describe('TerminalIngridientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalIngridientsService]
    });
  });

  it('should be created', inject([TerminalIngridientsService], (service: TerminalIngridientsService) => {
    expect(service).toBeTruthy();
  }));
});
