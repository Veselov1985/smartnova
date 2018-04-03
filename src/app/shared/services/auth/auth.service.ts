import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { urlApi } from '../../url.api';
import { SettingsService } from '../common/settings.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SignalRService } from './signalr.service';

@Injectable()
export class AuthService {
  private loggedIn = false;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private baseUrl: string;
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: Http,
    private router: Router,
    private settingsService: SettingsService,
    private signalRService: SignalRService
  ) {
    if (!!sessionStorage.getItem('auth_token')) {
      this.isLoggedIn.next(true);
    }
  }
  
  login(data: any) {
    const serviseUrl = urlApi.serveraccount + 'Login';
    return this.http
      .post(serviseUrl, JSON.stringify(data), { headers: this.headers })
      .map(res => res.json())
      .map(res => {
        if (res.IsSuccess) {
          sessionStorage.setItem('auth_token', 'true');
          sessionStorage.setItem('UserPk', res.UserPk);
          sessionStorage.setItem('TnPk', res.TnPk);
          this.loggedIn = true;
          this.isLoggedIn.next(true);
          this.removeMultiflters();
          this.settingsService.setDefaultSettings();
        }
        return res;
      });
  }

  logout() {
    const serviseUrl = urlApi.serveraccount + 'Logout';
    return this.http
      .post(serviseUrl, '', { headers: this.headers })
      .map(res => res.json())
      .map(res => {
        if (res.IsSuccess) {
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('UserPk');
          sessionStorage.removeItem('TnPk');
          this.loggedIn = false;
          this.isLoggedIn.next(false);
          this.router.navigate(['/']);
          this.removeMultiflters();
          this.settingsService.setDefaultSettings();
          // this.signalRService.disableDemoMode();
        }
        return res;
      });
  }

  // isLoggedIn() {
  //   return this.loggedIn;
  // }
  removeMultiflters() {
    sessionStorage.removeItem('terminalsMultiFilter');
    sessionStorage.removeItem('collectMultiFilter');
    sessionStorage.removeItem('ingrMultiFilter');
    sessionStorage.removeItem('productMultiFilter');
    sessionStorage.removeItem('sellsMultiFilter');
    sessionStorage.removeItem('eventsMultiFilter');
  }

  singin() {
    const options = new RequestOptions({
      headers: this.headers
    });
    const serviseUrl = urlApi.serveraccount + 'Signin';
    return this.http
      .post(serviseUrl, '', { headers: this.headers })
      .map(res => res.json())
      .map(res => {
        if (res.Authenticated) {
          sessionStorage.setItem('auth_token', 'true');
          this.loggedIn = true;
          this.isLoggedIn.next(true);
        } else {
          sessionStorage.removeItem('auth_token');
          this.loggedIn = false;
          this.isLoggedIn.next(false);
        }
        return res;
      });
  }

  restorePassword(data: any) {
    const serviseUrl = urlApi.serveraccount + 'RestorePassword';
    return this.http
      .post(serviseUrl, JSON.stringify(data), { headers: this.headers })
      .map(res => res.json());
  }

  changePassword(data: any) {
    const serviseUrl = urlApi.serveraccount + 'ChangePassword';
    return this.http
      .post(serviseUrl, JSON.stringify(data), { headers: this.headers })
      .map(res => res.json());
  }

  register(data: any) {
    const serviseUrl = urlApi.serveraccount + 'Register';
    return this.http
      .post(serviseUrl, JSON.stringify(data), { headers: this.headers })
      .map(res => res.json());
  }
}
