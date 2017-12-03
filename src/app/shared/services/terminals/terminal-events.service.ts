import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';
import { urlApi } from '../../url.api';

import { StorageData } from '../../index';

@Injectable()
export class GetTerminalEventsService {

  productStore: Array<any>;
  Pk: string;
  loggedIn: boolean;
  baseUrl: string;
  dataStore: StorageData;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.Pk = sessionStorage.getItem('productPk');
    if (this.loggedIn) {
      this.baseUrl = urlApi.server;
    } else {
      this.baseUrl = urlApi.serverdemo;
    }
  }

  getEvents(): Observable<any> {
    const serviseUrl = this.baseUrl + 'GetTerminalEvents';
    return this.http.post(serviseUrl, JSON.stringify({ Pk: this.Pk }), { headers: this.headers })
      .map(response => response.json());
  }

  setEventAsViewed(itemPk: any): Observable<any> {
    const serviseUrl = this.baseUrl + 'SetEventAsViewed';
    return this.http.post(serviseUrl, JSON.stringify({ Pk: itemPk }), { headers: this.headers })
      .map(response => response.json());
  }
  setNewEventsAlert() {
    if (this.dataStore.BarData.BarData.Alarms > 0) {
      this.dataStore.BarData.BarData.Alarms -= 1;
      const newData = Object.assign({}, this.dataStore);
      // this._terminals$.next(newData);
    }
  }

  setNewEventsEvent() {
    if (this.dataStore.BarData.BarData.Events > 0) {
      this.dataStore.BarData.BarData.Events -= 1;
      const newData = Object.assign({}, this.dataStore);
      // this._terminals$.next(newData);
    }

  }
}
