import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { urlApi } from '../../url.api';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class TerminalProductsConfiguratorService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  loggedIn: boolean;
  baseUrl: string;

  constructor(private http: Http, private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });
  }

  getCourentProductConfig(pk: string): any {
    const productConfig = 'Конфигурация продукта ' + pk;
    return productConfig;
  }
  setCourentProductConfig(params: string): void {
    console.log('записано в базу ' + params);
  }

  getCurrentProduct(pk: string) {
    const serviseUrl = this.baseUrl + 'GetGoodsUpdate';
    const terminalPk = sessionStorage.getItem('productPk');
    return this.http.post(serviseUrl, JSON.stringify({ TerminalPk: terminalPk, GoodsPk: pk }), { headers: this.headers })
      .map(response => response.json());
  }

  setCurrentProduct(data: any): Observable<any> {
    const serviseUrl = this.baseUrl + 'SetGoodsUpdate';
    return this.http.post(serviseUrl, data, { headers: this.headers })
      .map(response => response.json());
  }

  applyProductConfig(data: any): Observable<any> {
    const serviseUrl = this.baseUrl + 'ApplyGoodsUpdate';
    return this.http.post(serviseUrl, data, { headers: this.headers })
      .map(response => response.json());
  }
}
