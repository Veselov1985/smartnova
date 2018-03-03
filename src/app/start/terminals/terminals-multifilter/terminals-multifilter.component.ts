import { Component, OnInit, HostListener, Output, EventEmitter, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';

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

export class TerminalsMultifilterComponent implements OnInit, OnChanges {
  @ViewChild('form') form: NgForm;
  @Input() filtered: boolean;
  @Output() terminalsMultiFilter = new EventEmitter();
  public state = 'inactive';

  filterForm = [
    {id: 'Id', name: 'EID', type: 'single'},
    {id: 'Name', name: 'Наименование', type: 'single'},
    {id: 'Connection', name: 'Связь', type: 'checkbox'},
    {id: 'Address', name: 'Адрес', type: 'single'},
    {id: 'SalesSum', name: 'Сумма продаж', type: 'multi'},
    {id: 'CollectSum', name: 'Сумма инкассации', type: 'multi'},
    {id: 'Service', name: 'Обслуживание', type: 'checkbox'},
    {id: 'Failure', name: 'Аварии', type: 'checkbox'},
  ];

  checkboxes = {
    Connection: null,
    Service: null,
    Failure: null
  };

  constructor(private StateMultifilter: StateMultifilterService) {
    StateMultifilter.stateChange$.subscribe(stateConfig => this.state = stateConfig);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.state === 'active') {
      this.MultifilterState();
    }
  }

  ngOnInit() {
    const sort = JSON.parse(sessionStorage.getItem('terminalsSortOrder'));
    if (sort) {
      this.filterForm.sort((a, b) => {
        return sort.findIndex(item => a.id === item) - sort.findIndex(item => b.id === item);
      });
    }
    setTimeout(() => {
      const mf = JSON.parse(sessionStorage.getItem('terminalsMultiFilter'));
      if (mf) {
        this.form.setValue(mf);
      }
    }, 100);
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

  onSort() {
    sessionStorage.setItem('terminalsSortOrder', JSON.stringify(this.filterForm.map(item => item.id)));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filtered && !changes.filtered.firstChange && !changes.filtered.currentValue) {
      this.filterForm.forEach(item => {
        if (item.type === 'single') {
          this.form.controls[item.id].setValue('');
        } else if (item.type === 'multi') {
          this.form.controls[`${item.id}From`].setValue('');
          this.form.controls[`${item.id}To`].setValue('');
        } else {
          this.form.controls[item.id].setValue(null);
        }
      });
    }
  }
}

