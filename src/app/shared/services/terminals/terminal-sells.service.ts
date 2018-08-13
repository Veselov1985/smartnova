import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';
import { urlApi } from '../../url.api';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class GetTerminalSellsService {

  productStore: Array<any>;
  Pk: string;
  baseUrl: string;

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http, private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });
  }

  getSell(pk: string): Observable<any> {
    const serviseUrl = this.baseUrl + 'GetTerminalSales';
    return this.http.post(serviseUrl, JSON.stringify({ Pk: pk }), { headers: this.headers })
    .map(response => {
      console.log(response.json());
    return   response.json(); });
  }
}
