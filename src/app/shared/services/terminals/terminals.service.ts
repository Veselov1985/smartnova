import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';

import { StorageTerminalsData } from '../../models';
import { urlApi } from '../../url.api';

@Injectable()
export class GetTerminalsService {

  private _terminals$: BehaviorSubject<StorageTerminalsData>;
  terminals: Observable<StorageTerminalsData>;
  private baseUrl: string;
  private dataStore: StorageTerminalsData;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  loggedIn: boolean;

  constructor(public http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    if (this.loggedIn) {
      this.baseUrl = urlApi.server;
    } else {
      this.baseUrl = urlApi.serverdemo;
    }
    // this.dataStore = new StorageTerminalsData();
    // this._terminals$ = <BehaviorSubject<StorageTerminalsData>>new BehaviorSubject(new StorageTerminalsData());
    // this.terminals = this._terminals$.asObservable();
  }

  // get terminals() {
  //   return this._terminals$.asObservable();
  // }

  getTerminals() {
    const Pk = localStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'GetTerminals';
    return this.http.post(serviseUrl, JSON.stringify({ Pk }), { headers: this.headers })
      .map(response => response.json());
  }
}
