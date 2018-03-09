import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '..';
import { urlApi } from '../..';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReportLoggingService {
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    baseUrl: string;

    constructor(private http: Http, private auth: AuthService) {
        this.auth.isLoggedIn.subscribe(isLoggedIn => {
            this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
        });
    }

    getLogs(): Observable<any> {
        const serviseUrl = this.baseUrl + 'GetSystemLogs';
        const Pk = sessionStorage.getItem('TnPk');
        return this.http.post(serviseUrl, JSON.stringify({ Pk: Pk }), { headers: this.headers })
            .map(response => response.json().Logs);
    }

    setLogsViewed(): Observable<any> {
        const serviseUrl = this.baseUrl + 'SetSystemLogsViewed';
        const Pk = sessionStorage.getItem('TnPk');
        return this.http.post(serviseUrl, JSON.stringify({ Pk: Pk }), { headers: this.headers });
    }

}
