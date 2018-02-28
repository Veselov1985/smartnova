import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener,
  SimpleChanges
} from '@angular/core';

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
export class CollectionMultifilterComponent implements OnInit, OnChanges {
  @ViewChild('form') form: NgForm;
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Input() filtered: boolean;
  @Output() collectMultiFilter = new EventEmitter();
  public state = 'inactive';

  filterForm = [
    {id: 'DateTime', name: 'Дата', type: 'date'},
    {id: 'Collection', name: 'Инкассировано', type: 'multi'},
    {id: 'GivenChange', name: 'Выдано сдачи', type: 'multi'},
    {id: 'FundChange', name: 'Фонд сдачи', type: 'multi'},
    {id: 'ServiceMan', name: 'ФИО сервисмена', type: 'single'},
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
    const sort = JSON.parse(sessionStorage.getItem('collectSortOrder'));
    if (sort) {
      this.filterForm.sort((a, b) => {
        return sort.findIndex(item => a.id === item) - sort.findIndex(item => b.id === item);
      });
    }
    setTimeout(() => {
      const mf = JSON.parse(sessionStorage.getItem('collectMultiFilter'));
      if (mf) {
        this.form.setValue(mf);
      }
    }, 100);
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

  onSort() {
    sessionStorage.setItem('collectSortOrder', JSON.stringify(this.filterForm.map(item => item.id)));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.filtered.firstChange && !changes.filtered.currentValue) {
      this.filterForm.forEach(item => {
        if (item.type === 'single') {
          this.form.controls[item.id].setValue('');
        } else if (item.type === 'multi') {
          this.form.controls[`${item.id}From`].setValue('');
          this.form.controls[`${item.id}To`].setValue('');
        } else if (item.type === 'date') {
          this.form.controls[`${item.id}From`].setValue(this.moment);
          this.form.controls[`${item.id}To`].setValue(new Date());
        }
      });
    }
  }
}
