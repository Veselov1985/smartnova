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
import { MultiFilterCollectPipe } from '../../../../shared/shared';
import { SettingsService } from '../../../../shared/services/common/settings.service';

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
  public sortBy: string;
  public sortOrder: string;

  public state: string;

  multiFilter: any;
  filtered: boolean;

  sumCollection: number;
  sumGivenChange: number;
  sumFundChange: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalCollectionService,
    private StateMultifilter: StateMultifilterService,
    private filterPipe: MultiFilterCollectPipe,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.data = this.route.snapshot.data['collection'];
    this.productPk = this.route.snapshot.parent.params['terminalPk'];

    const mFilter = sessionStorage.getItem('collectMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
      this.filtered = true;
    }

    this.countAggregatedData();

    if (mFilter && sessionStorage.getItem('collectSortOrder')) {
      this.sortBy = JSON.parse(sessionStorage.getItem('collectSortOrder'));
      this.sortOrder = 'asc';
    } else if (this.settingsService.settings) {
      this.sortBy = this.settingsService.settings.collection.sortBy || 'DateTime';
      this.sortOrder = this.settingsService.settings.collection.sortOrder || 'desc';
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
    this.countAggregatedData();
    this.sortBy = JSON.parse(sessionStorage.getItem('collectSortOrder'));
    this.sortOrder = 'asc';
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('collectMultiFilter');
    this.filtered = false;
    this.countAggregatedData();
  }

  countAggregatedData() {
    this.sumCollection = this.filterPipe.transform(this.data, this.multiFilter).reduce((sum, current) => {
      return sum + current.Collection;
    }, 0);
    this.sumGivenChange = this.filterPipe.transform(this.data, this.multiFilter).reduce((sum, current) => {
      return sum + current.GivenChange;
    }, 0);
    this.sumFundChange = this.filterPipe.transform(this.data, this.multiFilter).reduce((sum, current) => {
      return sum + current.FundChange;
    }, 0);
  }

  onChangeSort(sortBy: string) {
    this.settingsService.settings.collection.sortBy = sortBy;
  }

  onChangeSortOrder(sortOrder: string) {
    this.settingsService.settings.collection.sortOrder = sortOrder;
  }
}
