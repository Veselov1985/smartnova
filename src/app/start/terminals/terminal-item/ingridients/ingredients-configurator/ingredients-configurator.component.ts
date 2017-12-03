import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import {
  triggerConfigState,
  triggerPanelState,
  StateConfiguratorService,
  TerminalIngredientsConfiguratorService,
} from '../../../../../shared';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-ingredients-configurator',
  templateUrl: './ingredients-configurator.component.html',
  animations: [triggerConfigState, triggerPanelState],
  styleUrls: ['./ingredients-configurator.component.less']
})

export class IngredientsConfiguratorComponent implements OnInit, OnChanges {

  @Input() courentIngredientPk: string;

  public stateConfig = 'inactive';
  public ingredientConfig: string;

  constructor(
    private stateConfiguratorService: StateConfiguratorService,
    private terminalIngredientsConfiguratorService: TerminalIngredientsConfiguratorService,
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
    if (changes.courentIngredientPk && !changes.courentIngredientPk.isFirstChange()) {
      this.ingredientConfig = this.terminalIngredientsConfiguratorService.getCourentIngredientConfig(this.courentIngredientPk);
    }
  }

  ConfigState(event: any): void {
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

  SaveConfig(event: any): void {
    this.terminalIngredientsConfiguratorService.setCourentIngredientConfig(this.courentIngredientPk);
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

}

