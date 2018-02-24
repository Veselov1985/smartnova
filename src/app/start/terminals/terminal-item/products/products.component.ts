import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
import {
  GetTerminalProductsService,
  TItemProducts,
  StateMultifilterService,
  StateConfiguratorService,
  StateConfigModeService
} from '../../../../shared';

import { ProdictIngredientsComponent } from './prodict-ingredients/prodict-ingredients.component';
import { MultiFilterProductsPipe } from '../../../../shared/shared';
import { SettingsService } from './../../../../shared/services/common/settings.service';
import { Subscription } from 'rxjs/Subscription';
import { SignalRService } from '../../../../shared/services/auth/signalr.service';


@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})

export class ProductsComponent implements OnInit, OnDestroy {
  public data: TItemProducts[] = [];
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy: string;
  public sortOrder: string;

  productPk: string;
  public state: string;
  public stateConfig: string;
  public stateConfigMode: string;

  public courentProduct: TItemProducts;

  multiFilter: any;
  filtered: boolean;
  productsNumber: number;
  page: number;

  private saleSubscritption: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalProductsService,
    public dialog: MatDialog,
    private stateMultifilter: StateMultifilterService,
    private stateConfiguratorService: StateConfiguratorService,
    private stateConfigModeService: StateConfigModeService,
    private filterPipe: MultiFilterProductsPipe,
    private settingsService: SettingsService,
    private signalRService: SignalRService
  ) {
    this.stateConfigMode = this.stateConfigModeService.getStateConfigMode();
    stateConfigModeService.changeConfigMode$.subscribe(
      stateConfigMode => {
        this.stateConfigMode = stateConfigMode;
      }
    );
  }

  ngOnInit() {
    let Item = {} as any;
    if (!!this.route.snapshot.params['Item']) {
      Item = JSON.parse(this.route.snapshot.params['Item']);
      sessionStorage.setItem('ItemProduct', this.route.snapshot.params['Item']);
    } else {
      Item = JSON.parse(sessionStorage.getItem('ItemProduct'));
    }
    const mFilter = sessionStorage.getItem('productMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
      this.filtered = true;
    }

    this.productPk = Item.Pk || this.serviceProd.Pk;
    this.serviceProd.getTerminalProducts(this.productPk).subscribe(product => {
        if (product.IsSuccess) {
          this.data = product.TerminalGoods;
        } else {
          this.data = [];
        }
        this.productsNumber = this.filterPipe.transform(this.data, this.multiFilter).length;
      }, err => console.log(err));

    if (mFilter && sessionStorage.getItem('productsSortOrder')) {
      this.sortBy = JSON.parse(sessionStorage.getItem('productsSortOrder'));
      this.sortOrder = 'asc';
    } else if (this.settingsService.settings) {
      this.sortBy = this.settingsService.settings.products.sortBy || 'Id';
      this.sortOrder = this.settingsService.settings.products.sortOrder || 'asc';
    }

    this.page = this.settingsService.settings.products.page;
    
    this.saleSubscritption = this.signalRService.onSaleSent$.subscribe(resp => {
      this.serviceProd.getTerminalProducts(JSON.parse(<string>resp).TerminalPk).subscribe(product => {
        if (product.IsSuccess) {
          this.data = product.TerminalGoods;
        } else {
          this.data = [];
        }
        this.productsNumber = this.filterPipe.transform(this.data, this.multiFilter).length;
      }, err => console.log(err));
    });
  }

  MultifilterState(event: any) {
    event.stopPropagation();
    this.state = this.stateMultifilter.getStateMultifilter();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.stateMultifilter.setStateMultifilter(this.state);
    return false;
  }

  ConfigState(product: TItemProducts): void {
    this.courentProduct = product;
    this.stateConfig = this.stateConfiguratorService.getStateConfigurator();
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
    // return false;
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }
  goToProduct(item: any) {
    // this.router.navigate(['/hero', item.id]);
    // this.router.navigate(['start/products']);
  }

  openIngredients(event: any): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ProdictIngredientsComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyMultiFilter(multifilter) {
    this.multiFilter = multifilter;
    this.filtered = multifilter ? true : false;
    this.productsNumber = this.filterPipe.transform(this.data, this.multiFilter).length;
    this.sortBy = JSON.parse(sessionStorage.getItem('productsSortOrder'));
    this.sortOrder = 'asc';
  }

  clearMultiFilter() {
    this.multiFilter = null;
    sessionStorage.removeItem('productMultiFilter');
    this.filtered = false;
    this.productsNumber = this.filterPipe.transform(this.data, this.multiFilter).length;
  }

  onChangeSort(sortBy: string) {
    this.settingsService.settings.products.sortBy = sortBy;
  }

  onChangeSortOrder(sortOrder: string) {
    this.settingsService.settings.products.sortOrder = sortOrder;
  }

  ngOnDestroy(): void {
    if (this.saleSubscritption) {
      this.saleSubscritption.unsubscribe();
    }
  }
}
