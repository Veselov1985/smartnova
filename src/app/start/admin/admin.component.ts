import { AdminService } from './../../shared';
import { Observable } from 'rxjs/Observable';

import { User, UserTid} from './../../shared/models';
import { DataTableListComponent } from './dataTable-list/dataTable-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {PageScrollConfig} from 'ng2-page-scroll';
import {Subscription} from 'rxjs/Subscription';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})

export class AdminComponent implements OnInit {
    users: UserTid[]= [];
    user: UserTid;
    private getListUserSub:Subscription;
    private AddOrEditUserSub:Subscription;

    constructor( private adminServ: AdminService ) {
      PageScrollConfig.defaultScrollOffset=120;
      PageScrollConfig.defaultDuration=500;
      this.user=this.adminServ.getZeroUser();
     this.getListUserSub= this.adminServ.getListUser(sessionStorage.getItem('TnPk')).subscribe(data => this.users = data.Users);
  
    }

    ngOnInit() { 
   }

    AddUserTab(user: any) {
      this.AddOrEditUserSub=  this.adminServ.AddOrEditUser(user).subscribe(data =>{ 
        this.users = this.adminServ.compareDataUser(this.users,data.UserPk)
       })
        this.user=this.adminServ.getZeroUser();
    }

    SetUser(user: any) {
      this.user = user;
    }

    ngOnDdestroy(){
      this.AddOrEditUserSub.unsubscribe();
      this.getListUserSub.unsubscribe();
    }

}
