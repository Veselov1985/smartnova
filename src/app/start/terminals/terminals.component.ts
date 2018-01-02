import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SHARED_PIPE } from '../../shared/shared';

import {
  GetTerminalsService,
  StorageTerminalsData,
  StateMultifilterService,
} from '../../shared';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.less'],
})

export class TerminalsComponent implements OnInit {

  // @Input() data: any;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';

  public data: StorageTerminalsData;
  public state: string;

  multiFilter: any;
  filtered: boolean;

  constructor(
    private router: Router,
    private getTerminalsService: GetTerminalsService,
    private StateMultifilter: StateMultifilterService,
  ) { }


  ngOnInit() {
    this.getTerminalsService.getTerminals()
      .subscribe((data) => {
        if (data.IsSuccess) {
          this.data = data.Terminals;
        }
      });
    const mFilter = sessionStorage.getItem('terminalsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
      this.filtered = true;
    }
  }

  MultifilterState(event: any) {
    event.stopPropagation();
    this.state = this.StateMultifilter.getStateMultifilter();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
    return false;
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

  goToProduct(item: any) {
    sessionStorage.setItem('ItemProduct', JSON.stringify(item));
    this.router.navigate(['start/terminal-item/sells', { Item: JSON.stringify(item) }]);
  }

  applyMultiFilter(multifilter) {
    this.multiFilter = multifilter;
    this.filtered = multifilter ? true : false;
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('terminalsMultiFilter');
    this.filtered = false;
  }
}
