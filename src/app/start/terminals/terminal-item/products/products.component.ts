import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})

export class ProductsComponent implements OnInit {
  public data: TItemProducts[] = [];
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'Id';
  public sortOrder = 'asc';

  productPk: string;
  public state: string;
  public stateConfig: string;
  public stateConfigMode: string;

  public courentProduct: TItemProducts;

  multiFilter: any;
  filtered: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalProductsService,
    public dialog: MatDialog,
    private stateMultifilter: StateMultifilterService,
    private stateConfiguratorService: StateConfiguratorService,
    private stateConfigModeService: StateConfigModeService
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

    this.productPk = Item.Pk || this.serviceProd.Pk;
    this.serviceProd
      .getTerminalProducts(this.productPk)
      .subscribe(product => {
        if (product.IsSuccess) {
          this.data = product.TerminalGoods;
        } else {
          this.data = [];
        }
      },
      err => {
        console.log(err);
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
  }

  clearMultiFilter() {
    this.multiFilter = null;
    this.filtered = false;
  }
}
