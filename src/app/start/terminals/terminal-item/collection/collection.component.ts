import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {
  GetTerminalCollectionService,
  TItemCollections,
  StateMultifilterService,
} from '../../../../shared';

import { CollectionMultifilterComponent } from './collection-multifilter/collection-multifilter.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.less']
})
export class CollectionComponent implements OnInit {


  public data: TItemCollections[];
  productPk: string;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'DateTime';
  public sortOrder = 'desc';

  public state: string;

  multiFilter: any;
  filtered: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalCollectionService,
    private StateMultifilter: StateMultifilterService, ) {
  }

  ngOnInit() {
    this.serviceProd
      .getTerminalCollection()
      .subscribe(product => {
        this.data = product.TerminalIncaso;
        return product;
      },
      err => {
        console.log(err);
      });

    const mFilter = sessionStorage.getItem('collectMultiFilter');
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

  applyMultiFilter(multifilter) {
    this.multiFilter = multifilter;
    this.filtered = multifilter ? true : false;
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('collectMultiFilter');
    this.filtered = false;
  }
}
