import { TestBed, inject } from '@angular/core/testing';

import { TerminalIngredientsConfiguratorService } from './terminal-ingredients-configurator.service';

describe('TerminalIngredientsConfiguratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalIngredientsConfiguratorService]
    });
  });

  it('should be created', inject([TerminalIngredientsConfiguratorService], (service: TerminalIngredientsConfiguratorService) => {
    expect(service).toBeTruthy();
  }));
});
