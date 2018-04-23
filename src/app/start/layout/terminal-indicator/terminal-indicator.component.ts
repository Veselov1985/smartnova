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

  public Connection = false;
  public Name = '';
  public Address = '';
  public Id = '';
  public Registered: Date;

  public stateConfigMode: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stateConfigModeService: StateConfigModeService,
  ) {
    this.stateConfigMode = this.stateConfigModeService.getStateConfigMode();
  }

  ngOnInit() {
    this.item = JSON.parse(sessionStorage.getItem('ItemProduct'));
  }

  configModeToggle(event: any) {
    // console.log('courent:' + this.stateConfigMode);
    this.stateConfigMode = this.stateConfigModeService.getStateConfigMode();
    // console.log('get:' +  this.stateConfigMode);
    this.stateConfigMode = this.stateConfigMode === 'active' ? 'inactive' : 'active';
    // console.log('set:' +  this.stateConfigMode);
    this.stateConfigModeService.setStateConfigMode(this.stateConfigMode);
    return false;
  }
}
