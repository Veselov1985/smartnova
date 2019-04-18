import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishLast';
import {StorageTerminalsData, Terminal} from '../../models';
import {urlApi} from '../../url.api';
import {AuthService} from '../../services/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';

@Injectable()
export class GetTerminalsService {
  changeTerminal = new BehaviorSubject<any>(null);
  changeTerminal$ = this.changeTerminal.asObservable();
  terminals = new BehaviorSubject<Terminal[]>([]);
  terminals$ = this.terminals.asObservable();
  private baseUrl: string;
  private dataStore: StorageTerminalsData;
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  loggedIn: boolean;

  constructor(
    public http: Http,
    private auth: AuthService
  ) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
      this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
    });
    // this.dataStore = new StorageTerminalsData();
    // this._terminals$ = <BehaviorSubject<StorageTerminalsData>>new BehaviorSubject(new StorageTerminalsData());
    // this.terminals = this._terminals$.asObservable();
  }

  // get terminals() {
  //   return this._terminals$.asObservable();
  // }

  getTerminals() {
    const Pk = sessionStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'GetTerminals';
    return this.http.post(serviseUrl, JSON.stringify({Pk}), {headers: this.headers})
      .map(response =>  response.json());
  }

  getTerminals$() {
    const Pk = sessionStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'GetTerminals';
    return this.http.post(serviseUrl, JSON.stringify({Pk}), {headers: this.headers})
      .subscribe(response => {
        const data = response.json();
        if (data.IsSuccess) {
          this.terminals.next(data.Terminals);
        }
      });
  }

  change(val) {
    this.changeTerminal.next(val);
  }

  /**
   * Method  call Api and remove inst terminal
   * @param id {string} == Pk(guid terminal)
   */
  public removeTerminal(id: string) {
  if ( !environment.production) {
    const terminals = this.terminals.getValue().filter(term => term.Pk !== id);
    this.terminals.next(terminals);
  } else {
    const Pk = sessionStorage.getItem('TnPk');
    const serviseUrl = this.baseUrl + 'removeTerminal';
    return this.http.post(serviseUrl, JSON.stringify({Pk, id}), {headers: this.headers})
      .subscribe(response => {
        if (response) {
          this.getTerminals$();
        }
      });
  }
  }


  public __toFixedTerminalSaleSum(items): Array<Terminal> {
    return items.map((terminal: Terminal) => {
      terminal.SalesSum = this.__fixedNumber(terminal.SalesSum);
      return terminal;
    });
  }
  private __fixedNumber(num: number): number {
    return +num.toFixed(2);
  }
}
