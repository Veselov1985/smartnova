import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Output() sellsMultiFilter = new EventEmitter();

  public state = 'inactive';

  public moment: Date = new Date();

  public dateSearchFrom = this.moment;
  public dateSearchTo: Date = new Date();

  constructor(private StateMultifilter: StateMultifilterService) {
    StateMultifilter.stateChange$.subscribe(
      stateConfig => {
        this.state = stateConfig;
        if (stateConfig === 'active') {
          setTimeout(() => {
            this.cancelBtn.nativeElement.focus();
          }, 100);
        }
      }
    );
    this.moment.setDate(this.moment.getDate() - 7);
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
      this.sellsMultiFilter.emit(form.value);
      sessionStorage.setItem('sellsMultiFilter', JSON.stringify(form.value));
      this.MultifilterState();
    }
  }

  MultifilterState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
  }

}
