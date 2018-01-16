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
export class GetTerminalProductsService {
  productStore: Array<any>;
  Pk: string;
  baseUrl: string;

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http, private auth: AuthService) {
    this.Pk = sessionStorage.getItem('productPk');
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });
  }

  getTerminalProducts(Pk: any): Observable<any> {
    if (Pk) {
      this.Pk = Pk;
      sessionStorage.setItem('productPk', Pk);
    }
    const serviseUrl = this.baseUrl + 'GetTerminalGoods';
    // rename GetTerminalGoods  to GetTerminalProducts
    return this.http.post(serviseUrl, JSON.stringify({ Pk: this.Pk }), { headers: this.headers })
      .map(response => response.json());
  }
}
