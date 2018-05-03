import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  Terminal,
  StateConfigModeService
} from '../../../shared';


@Component({
  selector: 'app-terminal-indicator',
  templateUrl: './terminal-indicator.component.html',
  styleUrls: ['./terminal-indicator.component.less']
})
export class TerminalIndicatorComponent implements OnInit {
  public item: Terminal;
  public stateConfigMode: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateConfigModeService: StateConfigModeService,
  ) {
    this.stateConfigMode = this.stateConfigModeService.getStateConfigMode();
  }

  ngOnInit() {
    const item = JSON.parse(sessionStorage.getItem('ItemProduct'));
    item ? this.item = item : this.router.navigate(['/']);
  }

  configModeToggle(event: any) {
    this.stateConfigMode = this.stateConfigModeService.getStateConfigMode();
    this.stateConfigMode = this.stateConfigMode === 'active' ? 'inactive' : 'active';
    this.stateConfigModeService.setStateConfigMode(this.stateConfigMode);
    return false;
  }
}
