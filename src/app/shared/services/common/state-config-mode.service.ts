import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StateConfigModeService {

  private stateConfigMode = new BehaviorSubject<string>('active');

  changeConfigMode$ = this.stateConfigMode.asObservable();

  constructor() {
  }

  getStateConfigMode(): any {
    return this.stateConfigMode.getValue();
  }

  setStateConfigMode(state: string): void {
    this.stateConfigMode.next(state);
  }

}
