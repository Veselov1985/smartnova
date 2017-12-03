import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import {
  triggerConfigState,
  triggerPanelState,
  StateConfiguratorService,
  TerminalProductsConfiguratorService
} from '../../../../../shared';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-products-configurator',
  templateUrl: './products-configurator.component.html',
  animations: [triggerConfigState, triggerPanelState],
  styleUrls: ['./products-configurator.component.less']
})

export class ProductsConfiguratorComponent implements OnInit, OnChanges {

  @Input() courentProductPk: string;


  public stateConfig = 'inactive';
  public productConfig: string;

  constructor(
    private stateConfiguratorService: StateConfiguratorService,
    private productsConfiguratorService: TerminalProductsConfiguratorService
  ) {
    stateConfiguratorService.stateChange$.subscribe(
      stateConfig => {
        this.stateConfig = stateConfig;
      }
    );

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.courentProductPk && !changes.courentProductPk.isFirstChange()) {
      this.productConfig = this.productsConfiguratorService.getCourentProductConfig(this.courentProductPk);
    }
  }

  ConfigState(event: any): void {
    event.stopPropagation();
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

  SaveConfig(event: any): void {
    this.productsConfiguratorService.setCourentProductConfig(this.courentProductPk);
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }
}
