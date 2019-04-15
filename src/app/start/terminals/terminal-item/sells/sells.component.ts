import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
  GetTerminalSellsService,
  TItemSells,
  StateMultifilterService,
} from '../../../../shared';
import { MultiFilterSellsPipe } from '../../../../shared/shared';
import { SettingsService } from '../../../../shared/services/common/settings.service';
import { Subscription } from 'rxjs/Subscription';
import { SignalRService } from '../../../../shared/services/auth/signalr.service';

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.less']
})

export class SellsComponent implements OnInit, OnDestroy {

  public data: TItemSells[];
  productPk: string;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy: string;
  public sortOrder: string;
  public state: string;

  multiFilter: any;
  filtered: boolean;
  totalSum: number;
  page: number;
  searchFields = [
    'DateTime',
    'Name',
    'Summ',
    'SoldNumber',
    'SoldSum'
  ];

  private saleSubscritption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalSellsService,
    private StateMultifilter: StateMultifilterService,
    private filterPipe: MultiFilterSellsPipe,
    private settingsService: SettingsService,
    private signalRService: SignalRService,
  ) { }

  ngOnInit() {
    const mFilter = sessionStorage.getItem('sellsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
      this.filtered = true;
    }

    this.productPk = this.route.snapshot.parent.params.terminalPk;
    this.serviceProd.getSell(this.productPk).subscribe(product => {
        this.data = product.TerminalSales;
        console.log(product);
        this.totalSum = this.__getTotalSum();
        return product;
      }, err => console.log(err));

    if (mFilter && sessionStorage.getItem('sellsSortOrder')) {
      this.sortBy = JSON.parse(sessionStorage.getItem('sellsSortOrder'));
      this.sortOrder = 'asc';
    } else if (this.settingsService.settings) {
      this.sortBy = this.settingsService.settings.sells.sortBy || 'DateTime';
      this.sortOrder = this.settingsService.settings.sells.sortOrder || 'desc';
    }

    this.page = this.settingsService.settings.sells.page;
    this.rowsOnPage = this.settingsService.settings.sells.rowsOnPage;

    this.saleSubscritption = this.signalRService.onSaleSent$.subscribe(resp => {
      this.serviceProd.getSell(JSON.parse(<string>resp).TerminalPk).subscribe(product => {
        this.data = product.TerminalSales;
        this.totalSum = this.__getTotalSum();
        return product;
      }, err => console.log(err));
    });
  }

  private __toInt(num: string) {
    return +num;
  }
  private __getTotalSum(): number {
    const total = this.filterPipe.transform(this.data, this.multiFilter).reduce((sum, current) => {
      return sum + current.SoldSum;
    }, 0);
    return  this.__toInt(total.toFixed(2));
  }

  MultifilterState(event: any) {
    event.stopPropagation();
    this.state = this.StateMultifilter.getStateMultifilter();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
    return false;
  }

  setRowsOnPage() {
    this.settingsService.settings.sells.rowsOnPage = this.rowsOnPage;
  }

  applyMultiFilter(multifilter) {
    this.multiFilter = multifilter;
    this.filtered = multifilter ? true : false;
    this.totalSum = this.__getTotalSum();
    this.sortBy = JSON.parse(sessionStorage.getItem('sellsSortOrder'));
    this.sortOrder = 'asc';
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('sellsMultiFilter');
    this.filtered = false;
    this.totalSum = this.__getTotalSum();
  }

  onChangeSort(sortBy: string) {
    this.settingsService.settings.sells.sortBy = sortBy;
  }

  onChangeSortOrder(sortOrder: string) {
    this.settingsService.settings.sells.sortOrder = sortOrder;
  }

  ngOnDestroy(): void {
    if (this.saleSubscritption) {
      this.saleSubscritption.unsubscribe();
    }
  }
}
