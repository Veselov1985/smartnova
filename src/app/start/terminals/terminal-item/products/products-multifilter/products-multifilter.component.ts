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
  selector: 'app-products-multifilter',
  templateUrl: './products-multifilter.component.html',
  animations: [triggerMultifilterState, triggerPanelState],
  styleUrls: ['./products-multifilter.component.less']
})

export class ProductsMultifilterComponent implements OnInit {

  public state: string = 'inactive';

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
