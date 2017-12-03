import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';

import { StorageBarData } from '../../models';
import { urlApi } from '../../url.api';

@Injectable()
export class GetBarDataService {

  private _terminals$: BehaviorSubject<StorageBarData>;
  terminals: Observable<StorageBarData>;
  private baseUrl: string;
  private barData: StorageBarData;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  loggedIn: boolean;
  public state = 'inactive';

  constructor(public http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    if (this.loggedIn) {
      this.baseUrl = urlApi.server;
    } else {
      this.baseUrl = urlApi.serverdemo;
    }

    this.barData = new StorageBarData();
     this._terminals$ = <BehaviorSubject<StorageBarData>>new BehaviorSubject(new StorageBarData());
    this.terminals = this._terminals$.asObservable();
  }

  getBarData() {
    const Pk = localStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'GetBarData';
    return this.http
    .post(serviseUrl, JSON.stringify({Pk}), { headers: this.headers })
    .map(response => response.json());
  }

  setBarData() {
    if (this.barData.IsSuccess) {
      this.barData.BarData.Alarms -= 1;
      const newData = Object.assign({}, this.barData);
      this._terminals$.next(newData);
    }
  }

  setNewEventsAlert() {
    if (this.barData.BarData.Alarms > 0) {
      this.barData.BarData.Alarms -= 1;
      const newData = Object.assign({}, this.barData);
      this._terminals$.next(newData);
    }
  }

  setNewEventsEvent() {
    if (this.barData.BarData.Events > 0) {
      this.barData.BarData.Events -= 1;
      const newData = Object.assign({}, this.barData);
      this._terminals$.next(newData);
    }

  }

}
