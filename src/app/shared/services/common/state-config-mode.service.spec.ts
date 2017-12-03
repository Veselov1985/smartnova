import { TestBed, inject } from '@angular/core/testing';

import { StateConfigModeService } from './state-config-mode.service';

describe('StateConfigModeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateConfigModeService]
    });
  });

  it('should be created', inject([StateConfigModeService], (service: StateConfigModeService) => {
    expect(service).toBeTruthy();
  }));
});
