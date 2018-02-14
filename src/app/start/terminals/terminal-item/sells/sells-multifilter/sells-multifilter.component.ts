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
  @ViewChild('form') form: NgForm;
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Output() sellsMultiFilter = new EventEmitter();

  public state = 'inactive';

  filterForm = [
    {id: 'DateTime', name: 'Дата', type: 'date'},
    {id: 'Name', name: 'Наименование', type: 'single'},
    {id: 'Summ', name: 'Цена', type: 'multi'},
    {id: 'SoldNumber', name: 'Количество', type: 'multi'},
    {id: 'SoldSum', name: 'Сумма', type: 'multi'},
  ];

  public moment: Date = new Date();

  searchDates = {
    DateTimeFrom: this.moment,
    DateTimeTo: new Date()
  };

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
    const sort = JSON.parse(sessionStorage.getItem('sellsSortOrder'));
    if (sort) {
      this.filterForm.sort((a, b) => {
        return sort.findIndex(item => a.id === item) - sort.findIndex(item => b.id === item);
      });
    }
    setTimeout(() => {
      const mf = JSON.parse(sessionStorage.getItem('sellsMultiFilter'));
      if (mf) {
        this.form.setValue(mf);
      }
    }, 100);
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

  onSort() {
    sessionStorage.setItem('sellsSortOrder', JSON.stringify(this.filterForm.map(item => item.id)));
  }
}
