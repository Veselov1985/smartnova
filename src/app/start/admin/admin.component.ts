import {AdminService} from './../../shared';

import {UserTid} from './../../shared/models';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageScrollConfig} from 'ng2-page-scroll';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})

export class AdminComponent implements OnInit, OnDestroy {
  users: UserTid[] = [];
  user: UserTid;
  private getListUserSub: Subscription;
  private AddOrEditUserSub: Subscription;

  constructor(private adminServ: AdminService) {
    PageScrollConfig.defaultScrollOffset = 120;
    PageScrollConfig.defaultDuration = 500;
    this.user = this.adminServ.getZeroUser();
    this.getListUserSub = this.adminServ.getListUser(sessionStorage.getItem('TnPk')).subscribe(data => this.users = data.Users);

  }

  ngOnInit() {
  }

  AddUserTab(user: any) {
    this.AddOrEditUserSub = this.adminServ.AddOrEditUser(user).subscribe(data => {
      this.users = this.adminServ.compareDataUser(this.users, data.UserPk);
    });
    this.user = this.adminServ.getZeroUser();
  }

  SetUser(user: any) {
    this.user = user;
  }

  ngOnDestroy() {
    this.AddOrEditUserSub.unsubscribe();
    this.getListUserSub.unsubscribe();
  }

}
