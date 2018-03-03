import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  SimpleChanges,
  OnChanges,
  Input
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
  selector: 'app-products-multifilter',
  templateUrl: './products-multifilter.component.html',
  animations: [triggerMultifilterState, triggerPanelState],
  styleUrls: ['./products-multifilter.component.less']
})

export class ProductsMultifilterComponent implements OnInit, OnChanges {
  @ViewChild('form') form: NgForm;
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Input() filtered: boolean;
  @Output() productsMultiFilter = new EventEmitter();
  id: string;

  filterForm = [
    {id: 'Id', name: 'ID', type: 'single', pattern: '^[A-Za-z0-9]+$'},
    {id: 'Name', name: 'Наименование', type: 'single', pattern: null},
    {id: 'BaseSum', name: 'Базовая цена', type: 'multi', pattern: null},
    {id: 'SoldNumber', name: 'Количество проданных', type: 'multi', pattern: null},
    {id: 'SoldSum', name: 'Сумма проданных', type: 'multi', pattern: null},
  ];

  public state = 'inactive';

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
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.state === 'active') {
      this.MultifilterState();
    }
  }

  ngOnInit() {
    const sort = JSON.parse(sessionStorage.getItem('productsSortOrder'));
    if (sort) {
      this.filterForm.sort((a, b) => {
        return sort.findIndex(item => a.id === item) - sort.findIndex(item => b.id === item);
      });
    }
    setTimeout(() => {
      const mf = JSON.parse(sessionStorage.getItem('productMultiFilter'));
      if (mf) {
        this.form.setValue(mf);
      }
    }, 100);
  }

  checkFilter(form: NgForm) {
    if (form && form.valid) {
      this.productsMultiFilter.emit(form.value);
      sessionStorage.setItem('productMultiFilter', JSON.stringify(form.value));
      this.MultifilterState();
    }
  }
  MultifilterState() {
      this.state = this.state === 'active' ? 'inactive' : 'active';
      this.StateMultifilter.setStateMultifilter(this.state);
  }

  onSort() {
    sessionStorage.setItem('productsSortOrder', JSON.stringify(this.filterForm.map(item => item.id)));
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
