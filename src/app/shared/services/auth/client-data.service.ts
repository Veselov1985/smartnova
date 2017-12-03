import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { urlApi } from '../../url.api';

@Injectable()
export class ClientDataService {

  private baseUrl: string;
  private loggedIn: boolean;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    public http: Http
  ) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    if (this.loggedIn) {
      this.baseUrl = urlApi.server;
    } else {
      this.baseUrl = urlApi.serverdemo;
    }
   }

  getClientData() {
    const Pk = localStorage.getItem('UserPk');
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
