import { TestBed, inject } from '@angular/core/testing';

import { StateUserpanelService } from './state-userpanel.service';

describe('StateUserpanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateUserpanelService]
    });
  });

  it('should be created', inject([StateUserpanelService], (service: StateUserpanelService) => {
    expect(service).toBeTruthy();
  }));
});
