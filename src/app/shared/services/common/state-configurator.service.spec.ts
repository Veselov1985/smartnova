import { TestBed, inject } from '@angular/core/testing';

import { StateConfiguratorService } from './state-configurator.service';

describe('StateConfiguratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateConfiguratorService]
    });
  });

  it('should be created', inject([StateConfiguratorService], (service: StateConfiguratorService) => {
    expect(service).toBeTruthy();
  }));
});
