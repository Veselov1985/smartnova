import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { urlApi } from '../../url.api';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class ChartMainService {

  charts = new BehaviorSubject<any>(null);
  charts$ = this.charts.asObservable();
  loggedIn: boolean;
  baseUrl: string;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http, private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });
  }

  getChartMain(): Observable<any> {
    const Pk = sessionStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'GetChartLine';
    return this.http.post(serviseUrl, JSON.stringify({ Pk: Pk }), { headers: this.headers })
      .map(response => {
        const data = response.json();
        if (data.IsSuccess) {
          this.charts.next(data.LineChart);
        }
        return data;
      });
  }

  getChartMain$(): void {
    const Pk = sessionStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'GetChartLine';
    this.http.post(serviseUrl, JSON.stringify({ Pk: Pk }), { headers: this.headers })
      .subscribe(response => {
        const data = response.json();
        if (data.IsSuccess) {
          this.charts.next(data.LineChart);
        }
      });
  }

}
