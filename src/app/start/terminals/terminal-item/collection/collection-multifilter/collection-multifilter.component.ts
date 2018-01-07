import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter, HostListener } from '@angular/core';

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
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-collection-multifilter',
  templateUrl: './collection-multifilter.component.html',
  animations: [triggerPanelState, triggerMultifilterState],
  styleUrls: ['./collection-multifilter.component.less']
})
export class CollectionMultifilterComponent implements OnInit {
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Output() collectMultiFilter = new EventEmitter();
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
      this.collectMultiFilter.emit(form.value);
      sessionStorage.setItem('collectMultiFilter', JSON.stringify(form.value));
      this.MultifilterState();
    }
  }

  MultifilterState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
  }
}
