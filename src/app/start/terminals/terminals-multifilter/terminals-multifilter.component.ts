import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

import { DateTimePickerModule } from 'ng-pick-datetime';

import { trigger, state, style, animate, transition } from '@angular/animations';

import {
  triggerMultifilterState,
  triggerPanelState,
  StateMultifilterService,
} from '../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-terminals-multifilter',
  templateUrl: './terminals-multifilter.component.html',
  animations: [triggerMultifilterState, triggerPanelState],
  styleUrls: ['./terminals-multifilter.component.less']
})

export class TerminalsMultifilterComponent implements OnInit {

  @Output() terminalsMultiFilter = new EventEmitter();
  public state = 'inactive';

  // temp data

  public thisMultifilterForm: Array<string> = [
    '111',
    '222',
    '333',
    '444',
    '555',
    '666',
    '777',
    '888',
  ];

  // temp data
  connection = null;
  service = null;
  failure = null;

  constructor(private StateMultifilter: StateMultifilterService) {
    StateMultifilter.stateChange$.subscribe(
      state => {
        this.state = state;
      }
    );
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.state === 'active') {
      this.MultifilterState();
    }
  }

  ngOnInit() {
  }

  checkFilter(form: NgForm) {
    if (form && form.valid) {
      this.terminalsMultiFilter.emit(form.value);
      sessionStorage.setItem('terminalsMultiFilter', JSON.stringify(form.value));
      this.MultifilterState();
    }
  }

  MultifilterState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
  }
}

