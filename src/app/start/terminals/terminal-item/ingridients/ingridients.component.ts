import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  GetTerminalIngridientsService,
  TItemIngridient,
  StateMultifilterService,
  StateConfiguratorService,
  StateConfigModeService
} from '../../../../shared';
import { MultiFilterIngredientsPipe } from '../../../../shared/shared';
import { SettingsService } from '../../../../shared/services/common/settings.service';
import { SignalRService } from '../../../../shared/services/auth/signalr.service';

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingridients.component.html',
  styleUrls: ['./ingridients.component.less']
})

export class IngridientsComponent implements OnInit, OnDestroy {
  @Input('configMode') configMode: boolean;

  public data: TItemIngridient[];
  public productPk: string;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy: string;
  public sortOrder: string;
  public state: string;
  public stateConfig: string;
  public stateConfigMode: string;
  public currentIngredient: any;

  multiFilter: any;
  filtered: boolean;
  page: number;
  searchFields = [
    'Pid',
    'Name',
    'IssuanceVol',
    'DownloadVol',
    'CurrentVol',
    'Threshold'
  ];

  ingrNumber: number;
  private configSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalIngridientsService,
    private StateMultifilter: StateMultifilterService,
    private stateConfiguratorService: StateConfiguratorService,
    private stateConfigModeService: StateConfigModeService,
    private filterPipe: MultiFilterIngredientsPipe,
    private settingsService: SettingsService,
    private signalRService: SignalRService
  ) {
    stateConfigModeService.changeConfigMode$.subscribe(
      stateConfigMode => {
        this.stateConfigMode = stateConfigMode;
      }
    );
  }


  ngOnInit() {
    this.data = this.route.snapshot.data['ingredients'];
    this.productPk = this.route.snapshot.parent.params['terminalPk'];

    const mFilter = sessionStorage.getItem('ingrMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
      this.filtered = true;
    }

    this.ingrNumber = this.filterPipe.transform(this.data, this.multiFilter).length;

    if (mFilter && sessionStorage.getItem('ingredientsSortOrder')) {
      this.sortBy = JSON.parse(sessionStorage.getItem('ingredientsSortOrder'));
      this.sortOrder = 'asc';
    } else if (this.settingsService.settings) {
      this.sortBy = this.settingsService.settings.ingredients.sortBy || 'Pid';
      this.sortOrder = this.settingsService.settings.ingredients.sortOrder || 'asc';
    }

    this.page = this.settingsService.settings.ingredients.page;
    this.rowsOnPage = this.settingsService.settings.ingredients.rowsOnPage;

    this.configSubscription = this.signalRService.onConfigSent$.subscribe(resp => {
      this.serviceProd.getIngredients(JSON.parse(<string>resp).TerminalPk).subscribe(response => {
        this.data = response.IsSuccess ? response.TerminalIngredients : null;
      });
    });
  }

  setRowsOnPage() {
    this.settingsService.settings.ingredients.rowsOnPage = this.rowsOnPage;
  }

  MultifilterState(event: any) {
    event.stopPropagation();
    this.state = this.StateMultifilter.getStateMultifilter();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
    return false;
  }

  ConfigState(currentIngredient: any): void {
    this.currentIngredient = currentIngredient;
    this.stateConfig = this.stateConfiguratorService.getStateConfigurator();
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

  applyMultiFilter(multifilter) {
    this.multiFilter = multifilter;
    this.filtered = multifilter ? true : false;
    this.ingrNumber = this.filterPipe.transform(this.data, this.multiFilter).length;
    this.sortBy = JSON.parse(sessionStorage.getItem('ingredientsSortOrder'));
    this.sortOrder = 'asc';
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('ingrMultiFilter');
    this.filtered = false;
    this.ingrNumber = this.filterPipe.transform(this.data, this.multiFilter).length;
  }

  onChangeSort(sortBy: string) {
    this.settingsService.settings.ingredients.sortBy = sortBy;
  }

  onChangeSortOrder(sortOrder: string) {
    this.settingsService.settings.ingredients.sortOrder = sortOrder;
  }

  onConfigSent(event) {
    if (event) {
      const ingredient = this.data.find(item => item.Pk === event.ingredient.Pk);
      ingredient.UpdateState = 'Awaiting';
      if (!sessionStorage.getItem('TnPk')) {
        setTimeout(() => {
          ingredient.UpdateState = Math.floor(Math.random() * 2) ? 'Applied' : 'Conflict';
        }, 3000);
      }
    }
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }
}
