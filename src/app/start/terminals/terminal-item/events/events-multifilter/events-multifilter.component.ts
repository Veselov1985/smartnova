import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter, HostListener } from '@angular/core';
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
  selector: 'app-events-multifilter',
  templateUrl: './events-multifilter.component.html',
  animations: [triggerMultifilterState, triggerPanelState],
  styleUrls: ['./events-multifilter.component.less']
})

export class EventsMultifilterComponent implements OnInit {
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Output() eventsMultiFilter = new EventEmitter();
  public state = 'inactive';
  public moment: Date = new Date();

  public dateSearchFrom = this.moment;
  public dateSearchTo: Date = new Date();

  eventFields = [
    {eventType: 'Operational', eventDescr: 'Операционные', isChecked: false},
    {eventType: 'Uncertain', eventDescr: 'Неопределенные', isChecked: false},
    {eventType: 'System', eventDescr: 'Системные/аварии', isChecked: false},
    {eventType: 'Additional', eventDescr: 'Дополнительные', isChecked: false},
  ];
  viewed = null;

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
      const filter = form.value;
      filter.eventTypes = this.eventFields.filter(event => event.isChecked).map(event => event.eventType);
      this.eventsMultiFilter.emit(filter);
      sessionStorage.setItem('eventsMultiFilter', JSON.stringify(filter));
      this.MultifilterState();
    }
  }

  MultifilterState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
  }
}

