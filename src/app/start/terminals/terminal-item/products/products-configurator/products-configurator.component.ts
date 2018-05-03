import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import {MatSnackBar} from '@angular/material';

import {
  triggerConfigState,
  triggerPanelState,
  StateConfiguratorService,
  TerminalProductsConfiguratorService,
  TItemProducts
} from '../../../../../shared';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products-configurator',
  templateUrl: './products-configurator.component.html',
  animations: [triggerConfigState, triggerPanelState],
  styleUrls: ['./products-configurator.component.less']
})

export class ProductsConfiguratorComponent implements OnInit, OnChanges {
  @ViewChild('cancelBtn') private cancelBtn: ElementRef;
  @ViewChild('form') private form: NgForm;
  @Input() currentProduct: TItemProducts;
  @Output() configSent = new EventEmitter();

  public stateConfig = 'inactive';
  public productConfig: string;
  goodsUpdate = {
    GoodsPk: '',
    NewPrice: '',
    PreviousPrice: '',
    Price: '',
    SaleEnable: ''
  };
  errorMessage: string;

  constructor(
    private stateConfiguratorService: StateConfiguratorService,
    private productsConfiguratorService: TerminalProductsConfiguratorService,
    public snackBar: MatSnackBar
  ) {
    stateConfiguratorService.stateChange$.subscribe(
      stateConfig => {
        this.stateConfig = stateConfig;
        if (stateConfig === 'active') {
          setTimeout(() => {
            this.cancelBtn.nativeElement.focus();
          }, 100);
        }
      }
    );
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27 && this.stateConfig === 'active') {
      this.ConfigState(event);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.resetForm();
    this.errorMessage = '';
    if (changes.currentProduct && !changes.currentProduct.isFirstChange()) {
      this.productConfig = this.productsConfiguratorService.getCourentProductConfig(this.currentProduct.Pk);
      this.productsConfiguratorService.getCurrentProduct(this.currentProduct.Pk).subscribe(resp => {
        this.goodsUpdate = resp.GoodsUpdate;
      });
    }
  }

  ConfigState(event: any): void {
    event.stopPropagation();
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

  SaveConfig(event: any): void {
    this.productsConfiguratorService.setCourentProductConfig(this.currentProduct.Pk);
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

  submitConfig() {
    const price = this.form.value.NewPrice || this.goodsUpdate.PreviousPrice;
    if (price) {
      const setData = {
        SaleEnable: this.form.value.SaleEnable,
        Price: price,
        GoodsPk: this.currentProduct.Pk,
        TerminalPk: sessionStorage.getItem('productPk')
      };
      this.productsConfiguratorService.setCurrentProduct(setData).subscribe(resp => {
        this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
        this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
        this.configSent.emit({
          action: 'setConfig',
          product: this.currentProduct
        });
        this.snackBarShow(`Конфигурация отправлена. Продажа разрешена: ${setData.SaleEnable?'да':'нет'}, новая цена:${setData.Price}`);
      }, error => {
        this.snackBarShow('Произошла ошибка');
      });
    } else {
      this.errorMessage = 'Укажите цену';
    }
  }

  applyConfig() {
    const setData = {
      GoodsPk: this.currentProduct.Pk,
      TerminalPk: sessionStorage.getItem('productPk')
    };
    this.productsConfiguratorService.applyProductConfig(setData).subscribe(resp => {
      this.configSent.emit({
        action: 'applyConfig',
        product: this.currentProduct
      });
      this.snackBarShow('Конфигурация отправлена');
    }, error => {
      this.snackBarShow('Произошла ошибка');
    });
  }

  snackBarShow(message) {
    return this.snackBar.open(message, null, {
      duration: 2000,
      horizontalPosition: 'right'
    });
  }
}
