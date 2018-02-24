import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService, urlApi } from '../../shared';

@Component({
  selector: 'app-report-logging',
  templateUrl: './report-logging.component.html',
  styleUrls: ['./report-logging.component.less']
})
export class ReportLoggingComponent implements OnInit {
  baseUrl: string;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  logs: Array<any>;

  constructor(private http: Http, private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });
   }

  ngOnInit() {
    const Pk = sessionStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'GetSystemLogs';
    this.http.post(serviseUrl, JSON.stringify({ Pk }), { headers: this.headers })
      .subscribe(response => {
        const data = response.json().Logs
        this.logs = data ? data : [];
      });
  }

}
