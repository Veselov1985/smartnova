import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter, HostListener, Input } from '@angular/core';
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
  @ViewChild('form') form: NgForm;
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Input() activeEventType: number;
  @Output() eventsMultiFilter = new EventEmitter();
  public state = 'inactive';
  public moment: Date = new Date();

  searchDates = {
    DateTimeFrom: this.moment,
    DateTimeTo: new Date()
  };

  eventFields = [
    {eventType: 'Operational', eventDescr: 'Операционные', isChecked: false},
    {eventType: 'System', eventDescr: 'Системные/аварии', isChecked: false},
    {eventType: 'Uncertain', eventDescr: 'Неопределенные', isChecked: false},
    {eventType: 'Additional', eventDescr: 'Дополнительные', isChecked: false},
  ];
  viewed = null;

  filterForm = [
    {id: 'DateTime', name: 'Дата', type: 'date'},
    {id: 'Name', name: 'Наименование', type: 'single'},
    {id: 'TotalNumber', name: 'Количество', type: 'multi'},
    {id: 'Duration', name: 'Длительность, мин', type: 'multi'},
    {id: 'Viewed', name: 'Квитирование', type: 'checkbox'},
  ];

  checkboxes = {
    Viewed: null
  };

  constructor(private StateMultifilter: StateMultifilterService) {
    StateMultifilter.stateChange$.subscribe(
      stateConfig => {
        this.state = stateConfig;
        if (stateConfig === 'active') {
          this.eventFields.forEach(item => item.isChecked = false);
          this.eventFields[this.activeEventType - 1].isChecked = true;
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
    const sort = JSON.parse(sessionStorage.getItem('eventsSortOrder'));
    if (sort) {
      this.filterForm.sort((a, b) => {
        return sort.findIndex(item => a.id === item) - sort.findIndex(item => b.id === item);
      });
    }
    setTimeout(() => {
      const mf = JSON.parse(sessionStorage.getItem('eventsMultiFilter'));
      if (mf) {
        delete mf.eventTypes;
        this.form.setValue(mf);
      }
    }, 100);
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

  changeCheckbox(index: number) {
    this.eventFields[index].isChecked = !this.eventFields[index].isChecked;
  }

  onSort() {
    sessionStorage.setItem('eventsSortOrder', JSON.stringify(this.filterForm.map(item => item.id)));
  }
}

