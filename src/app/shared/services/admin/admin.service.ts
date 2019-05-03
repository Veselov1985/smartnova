import {AuthService} from './../auth/auth.service';
import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {urlApi} from '../../url.api';
import {environment} from '../../../../environments/environment';
import 'rxjs/add/observable/of';
import {ROLE} from '../../../start/admin/moca/moca';
import {SignalRService} from '../auth/signalr.service';


@Injectable()
export class AdminService {

  private baseUrl: string;

  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http,
    private auth: AuthService,
    private signalR: SignalRService,
    ) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });

  }

  RemoveUser(Pk: string) {
    const serviseUrl = this.baseUrl + ' RemoveUser';
    //public Guid? Pk
    return this.http.post(serviseUrl, JSON.stringify({Pk: Pk}), {headers: this.headers})
      .map(res => res.json())
      .map(res => {
        if (res.IsSuccess) {
          return res;
        }
      });

  }


  getListRole(): Observable<any> {
    if (this.signalR.isDemoMode) {
      const serviseUrl = this.baseUrl + 'GetAllRoles';
      return this.http.post(serviseUrl, null, {headers: this.headers})
        .map(res => res.json())
        .map(res => {
          if (res.IsSuccess) {
            return res;
          }
        });
    } else {
      return Observable.of(ROLE);
    }
  }


  AddOrEditUser(user) {
    if (this.signalR.isDemoMode) {
      const serviseUrl = this.baseUrl + 'AddOrEditUser';
      return this.http.post(serviseUrl, JSON.stringify(user), {headers: this.headers})
        .map(res => res.json())
        .map(res => {
          if (res.IsSuccess) {
            return res;
          }
        });
    } else {
      return Observable.of(null);
    }
  }


  getListUser(data: any) {
    if (this.signalR.isDemoMode) {
      const serviseUrl = this.baseUrl + 'GetAllUsersForTn';
      return this.http.post(serviseUrl, JSON.stringify({Pk: data}), {headers: this.headers})
        .map(res => res.json())
        .map(res => {
          if (res.IsSuccess) {
            return res;
          }
        });
    }else {
     return Observable.of({Users: []});
    }
  }


  getZeroUser() {
    return {
      Name: '',
      Email: '',
      Password: '',
      Phone: '',
      Confirm: '',
      AccountCreated: new Date(),
      LastLogin: new Date(),
      LogoPath: '',
      PatName: '',
      Pk: '',
      PostCode: '',
      SurName: '',
      TaxNumber: '',
      Tn: {Pk: sessionStorage.getItem('TnPk'), Name: sessionStorage.getItem('TnId')},
      Role: {Pk: '', Name: ''}
    };
  }

  setSettingsUser(value) {
    let setUser = this.getZeroUser();
    setUser.Pk = value.Pk;
    let split = value.Name.trim().split(' ');
    if (split.length < 2) {
      setUser.Name = split[0];
      setUser.SurName = '';
    } else {
      setUser.Name = split[0];
      setUser.SurName = split[1];
    }
    setUser.Role = value.Role;
    setUser.Password = value.Password;
    setUser.Email = value.Email;
    return setUser;

  }

  compareDataUser(listUser, user) {
    let list, state;
    list = listUser.filter((elem, i) => {
      if (elem.Pk !== user.Pk) {
        return true;
      } else {
        return false;
      }
    });
    list.unshift(user);

    return list;
  }
}
