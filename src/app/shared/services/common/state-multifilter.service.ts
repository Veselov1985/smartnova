import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StateMultifilterService {

  private state = new Subject<string>();

  // state: string = 'inactive';
  stateChange$ = this.state.asObservable();

  constructor() {
    this.state.next('inactive');
  }

  getStateMultifilter(): any {
    return this.state;
  }

  setStateMultifilter(state: any): void {
    this.state.next(state);
  }

}
