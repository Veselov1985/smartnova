import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
  StorageTerminalsData,
  TItemEvent,
  GetTerminalEventsService,
  StateMultifilterService,
  StateConfiguratorService,
  StateConfigModeService,
} from '../../../../shared';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {
  tab = 1;
  data = {
    Operational: {} as any,
    System: {} as any,
    Uncertain: {} as any
  };
  operationalEv = new Set();
  systemEv = new Set();
  uncertainEv = new Set();
  baseUrl: string;
  loggedIn: boolean;
  typeMultifilter: string;

  public state: string;
  public stateConfig: string;
  public stateConfigMode: string;
  public courentEventPk: string;


  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProd: GetTerminalEventsService,
    //  private getTerminals: StorageTerminalsData,
    public http: Http,
    private StateMultifilter: StateMultifilterService,
    private stateConfiguratorService: StateConfiguratorService,
    private stateConfigModeService: StateConfigModeService,
  ) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    if (this.loggedIn) { } else { }
    stateConfigModeService.changeConfigMode$.subscribe(
      stateConfigMode => {
        this.stateConfigMode = stateConfigMode;
      }
    );
  }

  ngOnInit() {

    this.serviceProd
      .getEvents()
      .subscribe(product => {
        for (const key of Object.keys(product.TerminalEvents)) {
          product.TerminalEvents[key].forEach((item: any) => {
            this.data[key][item.Type] = item;
          });
        }
        this.addAllEv('Operational');
      },
      err => {
        console.log(err);
      });


  }

  MultifilterState(event: any): void {
    this.state = this.StateMultifilter.getStateMultifilter();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateMultifilter.setStateMultifilter(this.state);
  }

  ConfigState(event: any, thisPk: string): void {
    this.courentEventPk = thisPk;
    this.stateConfig = this.stateConfiguratorService.getStateConfigurator();
    this.stateConfig = this.stateConfig === 'active' ? 'inactive' : 'active';
    this.stateConfiguratorService.setStateConfigurator(this.stateConfig);
  }

  setTab(num: number, ev: any) {
    ev.stopPropagation();
    ev.preventDefault();
    this.tab = num;
    switch (this.tab) {
      case 1: {
        this.addAllEv('Operational');
        break;
      }
      case 2: {
        this.addAllEv('System');
        break;
      }
      case 3: {
        this.addAllEv('Uncertain');
        break;
      }
      case 4: {
        this.addAllEv('Uncertain');
        break;
      }
    }
  }



  addLineOperational(ev: any, eventPoint: string) {
    const curentEvent = this.data.Operational[eventPoint];
    this.operationalEv.add(curentEvent);
  }

  addLineSistem(ev: any, eventPoint: string) {
    const curentEvent = this.data.System[eventPoint];
    this.systemEv.add(curentEvent);
  }

  addAllUncertainEv(ev: any, eventPoint: string) {
    const curentEvent = this.data.Uncertain[eventPoint];
    this.uncertainEv.add(curentEvent);
  }

  addAllEv(curentEventName: string) {
    for (const item of Object.keys(this.data[curentEventName])) {
      // this.checkboxCondition[curentEventName][item] = true;
      switch (curentEventName) {
        case 'Operational': {
          this.addLineOperational(null, item);
          break;
        }
        case 'System': {
          this.addLineSistem(null, item);
          break;
        }
        case 'Uncertain': {
          this.addAllUncertainEv(null, item);
          break;
        }
      }
    }
  }

  goToEventStatistic(ev: any, type: any, pk: any): any {
    ev.preventDefault();
    this.router.navigate(['start/terminal-item/events/stats', { params: JSON.stringify({ type: type, pk: pk }) }]);
  }

  // setEventViewed(item: TItemEvents, group: string) {
  //   alert(1);
  // }
  setEventViewed(item: TItemEvent, group: string) {
    if (!item.Viewed) {
      if (!!localStorage.getItem('auth_token')) {
        this.serviceProd
          .setEventAsViewed(item.Pk)
          .subscribe(res => {
            if (res.IsSuccess) {
              item.Viewed = true;
              if (group === 'System') {
                //  this.getTerminals.setNewEventsAlert();
              } else if (group === 'Operational') {
                //  this.getTerminals.setNewEventsEvent();
              }
            } else {
              console.log(res);
            }
          },
          err => {
            console.log(err);
          });
      } else {
        item.Viewed = true;
        if (group === 'System') {
          // this.getTerminals.setNewEventsAlert();
        } else if (group === 'Operational') {
          // this.getTerminals.setNewEventsEvent();
        }
      }
    }
  }






  openMultifilter(ev: any, tabindex: any): any {
    ev.preventDefault();
    this.typeMultifilter = tabindex;
  }
}
