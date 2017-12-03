import { Component, OnInit } from '@angular/core';

import {
  triggerMultifilterState,
  triggerPanelState,
  StateMultifilterService,
} from '../../../../../shared';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-sells-multifilter',
  templateUrl: './sells-multifilter.component.html',
  animations: [triggerMultifilterState, triggerPanelState],
  styleUrls: ['./sells-multifilter.component.less']
})
export class SellsMultifilterComponent implements OnInit {

  public state = 'inactive';

  public moment: Date = new Date();

  public input1Moment = this.moment;
  public input2Moment: Date = new Date();

  constructor(private StateMultifilter: StateMultifilterService) {
    StateMultifilter.stateChange$.subscribe(
      state => {
        this.state = state;
      }
    );
    this.moment.setDate(this.moment.getDate() - 7);
  }

  ngOnInit() {
  }

  MultifilterState(event: any) {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
    return false;
  }
}
