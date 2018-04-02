import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { urlApi } from '../../url.api';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class TerminalIngredientsConfiguratorService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  baseUrl: string;

  constructor(private http: Http, private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });
  }

  getCourentIngredientConfig(pk: string): any {
    const productConfig = 'Конфигурация ингредиента ' + pk;
    console.log(productConfig);
    return productConfig;
  }
  setCourentIngredientConfig(params: string): void {
    console.log('Настройки ингредиента записаны в базу ' + params);
  }

  getCurrentIngredientConfig(pk: string, terminalPk: string) {
    const serviseUrl = this.baseUrl + 'GetIngredientUpdate';
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
