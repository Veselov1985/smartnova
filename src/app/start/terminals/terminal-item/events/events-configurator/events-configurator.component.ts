import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

import {
  triggerConfigState,
  triggerPanelState,
  StateConfiguratorService,
  TerminalEventsConfiguratorService,
} from '../../../../../shared';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-events-configurator',
  templateUrl: './events-configurator.component.html',
  animations: [triggerConfigState, triggerPanelState],
  styleUrls: ['./events-configurator.component.less']
})

export class EventsConfiguratorComponent implements OnInit, OnChanges {

  @Input() courentEventPk: string;

  public stateConfig = 'inactive';
  public eventConfig: string;

  constructor(
    private stateConfiguratorService: StateConfiguratorService,
    private terminalEventsConfiguratorService: TerminalEventsConfiguratorService
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
    if (changes.courentEventPk && !changes.courentEventPk.isFirstChange()) {
      this.eventConfig = this.terminalEventsConfiguratorService.getCourentEventConfig(this.courentEventPk);
    }
  }

  ConfigState(event: any): void {
    event.stopPropagation();
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

  SaveConfig(event: any): void {
    this.terminalEventsConfiguratorService.setCourentEventConfig(this.courentEventPk);
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }
}
