import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

import { AuthService } from '../../../shared';

import { GetBarDataService, StorageBarData, StateUserpanelService, } from '../../../shared';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header-start',
  templateUrl: './header-start.component.html',
  styleUrls: ['./header-start.component.less']
})
export class HeaderStartComponent implements OnInit {
  @ViewChild('dropdownList') dropdownList: ElementRef;
  dropdownToggle = false;
  dropdownSubscription: Subscription;
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
  ) {}

  ngOnInit() {
    this.isAuth = sessionStorage.getItem('auth_token');
    this.getBarDataServise.getBarData().subscribe((data) => {
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
    ev.stopImmediatePropagation();
    this.dropdownToggle = !this.dropdownToggle;
    if (this.dropdownToggle) {
      this.dropdownSubscription = Observable.fromEvent(document, 'click').subscribe((event: Event) => {
        if (!this.dropdownList.nativeElement.contains(event.target)) {
          this.dropdownToggle = false;
          this.dropdownSubscription.unsubscribe();
        }
      });
    } else {
      if (this.dropdownSubscription) {
        this.dropdownSubscription.unsubscribe();
      }
    }
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

  logOut(ev: Event) {
    ev.preventDefault();
    if (this.authService.isLoggedIn.getValue()) {
      this.authService.logout().subscribe(() => console.log('logout'));
    } else {
      this.router.navigate(['/']);
    }
  }
}
