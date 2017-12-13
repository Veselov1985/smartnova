import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { urlApi } from '../../url.api';
// import localStorage from 'localStorage';

@Injectable()
export class AuthService {
  private loggedIn = false;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private baseUrl: string;

  constructor(private http: Http, private router: Router) {
    this.loggedIn = !!localStorage.getItem('auth_token');
    if (this.loggedIn) {
      this.baseUrl = urlApi.server;
    } else {
      this.baseUrl = urlApi.serverdemo;
    }
  }

  login(data: any) {
    const serviseUrl = urlApi.serveraccount + 'Login';
    return this.http
      .post(
      serviseUrl,
      JSON.stringify(data), {
        headers: this.headers
      }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.IsSuccess) {
          localStorage.setItem('auth_token', 'true');
          localStorage.setItem('UserPk', res.UserPk);
          localStorage.setItem('TnPk', res.TnPk);
          this.loggedIn = true;
        }
        return res;
      });
  }

  logout() {
    const serviseUrl = this.baseUrl + 'Logout';
    return this.http
      .post(
      serviseUrl,
      '', {
        headers: this.headers
      }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.IsSuccess) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('UserPk');
          localStorage.removeItem('TnPk');
          this.loggedIn = false;
          this.router.navigate(['/']);
        }
        return res;
      });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  singin() {
    const options = new RequestOptions({
      headers: this.headers
    });
    const serviseUrl = this.baseUrl + 'Signin';
    return this.http
      .post(serviseUrl, '', {
        headers: this.headers
      })
      .map(res => res.json())
      .map((res) => {
        if (res.Authenticated) {
          localStorage.setItem('auth_token', 'true');
          this.loggedIn = true;
        } else {
          localStorage.removeItem('auth_token');
          this.loggedIn = false;
        }
        return res;
      });
  }

  restorePassword(data: any) {
    const serviseUrl = this.baseUrl + 'RestorePassword';
    return this.http
      .post(
      serviseUrl,
      JSON.stringify(data), {
        headers: this.headers
      }
      )
      .map(res => res.json());
  }

  changePassword(data: any) {
    const serviseUrl = this.baseUrl + 'ChangePassword';
    return this.http
      .post(
      serviseUrl,
      JSON.stringify(data), {
        headers: this.headers
      }
      )
      .map(res => res.json());
  }

  register(data: any) {
    const serviseUrl = this.baseUrl + 'Register';
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
