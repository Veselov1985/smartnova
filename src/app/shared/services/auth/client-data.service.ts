import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { urlApi } from '../../url.api';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class ClientDataService {

  private baseUrl: string;
  private loggedIn: boolean;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http, private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.serveraccount : urlApi.serverdemo;
    });
   }

  getClientData() {
    const Pk = sessionStorage.getItem('UserPk');
    const serviseUrl = this.baseUrl + 'GetClientData';
    return this.http.post(serviseUrl, JSON.stringify({ Pk }), { headers: this.headers })
      .map(response => response.json());
  }

  editClientData(data: any) {
    const serviseUrl = this.baseUrl + 'EditClientData';
    return this.http
      .post(
      serviseUrl,
      JSON.stringify(data), {
        headers: this.headers
      }
      )
      .map(res => res.json());
  }

}
