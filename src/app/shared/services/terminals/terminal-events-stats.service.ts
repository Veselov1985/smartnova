import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';
import { urlApi } from '../../url.api';


@Injectable()
export class GetEventsStatsService {

  productStore: Array<any>;
  Pk: string;
  loggedIn: boolean;
  baseUrl: string;

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

  getTerminalEventsStats(params: any): Observable<any> {
    const paramsEvents = JSON.parse(params);
    const serviseUrl = this.baseUrl + 'GetAllTerminalEventsByType';

    return this.http.post(serviseUrl, JSON.stringify({ Pk: paramsEvents.pk, eventType: paramsEvents.type }), { headers: this.headers })
      .map(response => response.json());
  }
}
