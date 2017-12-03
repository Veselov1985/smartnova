import { Component, OnInit } from '@angular/core';

import { DateTimePickerModule } from 'ng-pick-datetime';

import { trigger, state, style, animate, transition } from '@angular/animations';

import {
  triggerMultifilterState,
  triggerPanelState,
  StateMultifilterService,
} from '../../../shared';

@Component({
  selector: 'app-terminals-multifilter',
  templateUrl: './terminals-multifilter.component.html',
  animations: [triggerMultifilterState, triggerPanelState],
  styleUrls: ['./terminals-multifilter.component.less']
})

export class TerminalsMultifilterComponent implements OnInit {

  public state = 'inactive';

  // temp data

  public thisMultifilterForm: Array<string> = [
    '111',
    '222',
    '333',
    '444',
  ];

  // temp data


  constructor(private StateMultifilter: StateMultifilterService) {
    StateMultifilter.stateChange$.subscribe(
      state => {
        this.state = state;
      }
    );
  }

  ngOnInit() {
  }

  MultifilterState(event: any) {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
    return false;
  }
}

