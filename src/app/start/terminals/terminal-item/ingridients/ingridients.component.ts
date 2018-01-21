import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {
  GetTerminalIngridientsService,
  TItemIngridients,
  StateMultifilterService,
  StateConfiguratorService,
  StateConfigModeService
} from '../../../../shared';

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingridients.component.html',
  styleUrls: ['./ingridients.component.less']
})

export class IngridientsComponent implements OnInit {
  @Input('configMode') configMode: boolean;

  public data: TItemIngridients[];
  public productPk: string;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';
  public state: string;
  public stateConfig: string;
  public stateConfigMode: string;
  public currentIngredient: any;

  multiFilter: any;
  filtered: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalIngridientsService,
    private StateMultifilter: StateMultifilterService,
    private stateConfiguratorService: StateConfiguratorService,
    private stateConfigModeService: StateConfigModeService,
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
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('ingrMultiFilter');
    this.filtered = false;
  }
}
