import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

import { AuthService } from '../../../shared';

import { GetBarDataService, StorageBarData, StateUserpanelService, } from '../../../shared';



@Component({
  selector: 'app-header-start',
  templateUrl: './header-start.component.html',
  styleUrls: ['./header-start.component.less']
})
export class HeaderStartComponent implements OnInit {
  dropdownToggle = false;
  isAuth: string;
  bardata: StorageBarData;
  signalReload = false;
  public state = 'inactive';

  constructor(
 //   private rootComp: AppComponent,
    private authService: AuthService,
    private getBarDataServise: GetBarDataService,
    private router: Router,
    private StateUserpanel: StateUserpanelService,
  ) {

  }

  ngOnInit() {
    this.isAuth = localStorage.getItem('auth_token');
    this.getBarDataServise.getBarData()
      .subscribe((data) => {
        if (data.IsSuccess) {
          this.bardata = data;
        }
      });
  }

  downloadEvents(ev: Event) {
    ev.preventDefault();
    location.reload();
  }

  dropdownMenu(ev: Event) {
    ev.preventDefault();
    this.dropdownToggle = this.dropdownToggle ? false : true;
  }
  signalReloadToggle(ev: Event) {
    if (ev) {
      ev.preventDefault();
    }
    this.signalReload = !this.signalReload;
  }

  openCloseSidebar(ev: Event) {
    event.stopPropagation();
    this.dropdownToggle = false;

    this.state = this.StateUserpanel.getStateUserpanel();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateUserpanel.setStateUserpanel(this.state);

    return false;
  }

  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
    // this.dropdownToggle = false;
  }

  logOut(ev: Event) {
    ev.preventDefault();
    if (this.authService.isLoggedIn.getValue()) {
      this.authService.logout().subscribe(() => console.log('logout'));
    } else {
      this.router.navigate(['/']);
    }
  }
}
