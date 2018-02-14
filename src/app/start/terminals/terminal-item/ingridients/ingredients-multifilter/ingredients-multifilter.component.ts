import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
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
  selector: 'app-ingredients-multifilter',
  templateUrl: './ingredients-multifilter.component.html',
  animations: [triggerMultifilterState, triggerPanelState],
  styleUrls: ['./ingredients-multifilter.component.less']
})
export class IngredientsMultifilterComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @Output() ingrMultiFilter = new EventEmitter();
  public state = 'inactive';

  filterForm = [
    {id: 'Pid', name: 'ID', type: 'single', pattern: '^[A-Za-z0-9]+$'},
    {id: 'Name', name: 'Наименование', type: 'single', pattern: null},
    {id: 'IssuanceVol', name: 'Объем выдачи', type: 'multi', pattern: null},
    {id: 'DownloadVol', name: 'Объем загрузки', type: 'multi', pattern: null},
    {id: 'CurrentVol', name: 'Текущий объем', type: 'multi', pattern: null},
    {id: 'Threshold', name: 'Порог', type: 'multi', pattern: null},
  ];

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

  ngOnInit() {
    const sort = JSON.parse(sessionStorage.getItem('ingredientsSortOrder'));
    if (sort) {
      this.filterForm.sort((a, b) => sort.findIndex(item => a.id === item) - sort.findIndex(item => b.id === item));
    }
    setTimeout(() => {
      const mf = JSON.parse(sessionStorage.getItem('ingrMultiFilter'));
      if (mf) {
        this.form.setValue(mf);
      }
    }, 100);
  }

  checkFilter(form: NgForm) {
    if (form && form.valid) {
      this.ingrMultiFilter.emit(form.value);
      sessionStorage.setItem('ingrMultiFilter', JSON.stringify(form.value));
      this.MultifilterState();
    }
  }

  MultifilterState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
  }

  onSort() {
    sessionStorage.setItem('ingredientsSortOrder', JSON.stringify(this.filterForm.map(item => item.id)));
  }
}
