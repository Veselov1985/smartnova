import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StateUserpanelService {

  private state = new Subject<string>();

  // state: string = 'inactive';
  stateChange$ = this.state.asObservable();

  constructor() {
    this.state.next('inactive');
  }

  getStateUserpanel(): any {
    return this.state;
  }

  setStateUserpanel(state: any): void {
    this.state.next(state);
  }

}
