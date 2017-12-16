import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { urlApi } from '../../url.api';

@Injectable()
export class TerminalIngredientsConfiguratorService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  loggedIn: boolean;
  baseUrl: string;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    if (this.loggedIn) {
      this.baseUrl = urlApi.server;
    } else {
      this.baseUrl = urlApi.serverdemo;
    }
  }

  getCourentIngredientConfig(pk: string): any {
    const productConfig = 'Конфигурация ингредиента ' + pk;
    console.log(productConfig);
    return productConfig;
  }
  setCourentIngredientConfig(params: string): void {
    console.log('Настройки ингредиента записаны в базу ' + params);
  }

  getCurrentIngredientConfig(pk: string) {
    const serviseUrl = this.baseUrl + 'GetIngredientUpdate';
    const terminalPk = sessionStorage.getItem('productPk');
    return this.http.post(serviseUrl, JSON.stringify({ TerminalPk: terminalPk, IngredientPk: pk }), { headers: this.headers })
      .map(response => response.json());
  }

  setCurrentIngredientConfig(data: any): Observable<any> {
    const serviseUrl = this.baseUrl + 'SetIngredientUpdate';
    return this.http.post(serviseUrl, data, { headers: this.headers })
      .map(response => response.json());
  }

  applyIngredientConfig(data: any): Observable<any> {
    const serviseUrl = this.baseUrl + 'ApplyIngredientUpdate';
    return this.http.post(serviseUrl, data, { headers: this.headers })
      .map(response => response.json());
  }

}
