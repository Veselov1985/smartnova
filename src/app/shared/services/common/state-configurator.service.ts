import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StateConfiguratorService {

  private state = new BehaviorSubject<string>('inactive');

  // state: string = 'inactive';
  stateChange$ = this.state.asObservable();

  constructor() {
    // this.state.next('');
  }

  // state configurator panel
  getStateConfigurator(): any {
    return this.state;
  }

  setStateConfigurator(state: any): void {
    this.state.next(state);
  }

}
