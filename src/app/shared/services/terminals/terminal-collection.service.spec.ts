import { TestBed, inject } from '@angular/core/testing';

import { TerminalCollectionService } from './terminal-collection.service';

describe('TerminalCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalCollectionService]
    });
  });

  it('should be created', inject([TerminalCollectionService], (service: TerminalCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
