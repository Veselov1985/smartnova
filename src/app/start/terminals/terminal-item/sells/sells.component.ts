import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  GetTerminalSellsService,
  TItemSells,
  StateMultifilterService,
} from '../../../../shared';



@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.less']
})

export class SellsComponent implements OnInit {

  public data: TItemSells[];
  productPk: string;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'DateTime';
  public sortOrder = 'desc';
  public state: string;

  multiFilter: any;
  filtered: boolean;
  totalSum: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalSellsService,
    private StateMultifilter: StateMultifilterService,
  ) { }

  ngOnInit() {
    let Item = {} as any;

    if (!!this.route.snapshot.params['Item']) {
      Item = JSON.parse(this.route.snapshot.params['Item']);
      sessionStorage.setItem('ItemProduct', this.route.snapshot.params['Item']);
    } else {
      Item = JSON.parse(sessionStorage.getItem('ItemProduct'));
    }
    this.productPk = Item.Pk || this.serviceProd.Pk;
    this.serviceProd
      .getSell(this.productPk)
      .subscribe(product => {
        this.data = product.TerminalSales;
        sessionStorage.setItem('key', 'value');
        this.totalSum = this.data.reduce((sum, current) => {
          return sum + current.SoldSum;
        }, 0);
        return product;
      },
      err => {
        console.log(err);
      });

    const mFilter = sessionStorage.getItem('sellsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
      this.filtered = true;
    }
  }

  toInt(num: string) {
    return +num;
  }

  MultifilterState(event: any) {
    event.stopPropagation();
    this.state = this.StateMultifilter.getStateMultifilter();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
    return false;
  }

  // sortByWordLength = (a: any) => {
  //    return a.city.length;
  // }

  applyMultiFilter(multifilter) {
    this.multiFilter = multifilter;
    this.filtered = multifilter ? true : false;
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('sellsMultiFilter');
    this.filtered = false;
  }
}
