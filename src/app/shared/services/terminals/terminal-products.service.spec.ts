import { TestBed, inject } from '@angular/core/testing';

import { TerminalProductsService } from './terminal-products.service';

describe('TerminalProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalProductsService]
    });
  });

  it('should be created', inject([TerminalProductsService], (service: TerminalProductsService) => {
    expect(service).toBeTruthy();
  }));
});
