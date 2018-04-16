import { AdminService } from './../../shared';
import { Observable } from 'rxjs/Observable';

import { User, UserTid} from './../../shared/models';
import { DataTableListComponent } from './dataTable-list/dataTable-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { Component, OnInit } from '@angular/core';

import {PageScrollConfig} from 'ng2-page-scroll';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})

export class AdminComponent implements OnInit {
    users: UserTid[]= [];
    user: UserTid;

    constructor( private adminServ: AdminService ) {
      PageScrollConfig.defaultScrollOffset=100;
      PageScrollConfig.defaultDuration=1000;

      this.user=this.adminServ.getZeroUser();
      this.adminServ.getListUser(sessionStorage.getItem('TnPk')).subscribe(data => this.users = data.Users);
  
    }



    ngOnInit() { 
   }

    AddUserTab(user: any) {

        //this.users.push(user);

        this.adminServ.AddOrEditUser(user).subscribe(data =>{ 
            this.users = this.adminServ.compareDataUser(this.users,data.UserPk)
        })
    
        this.user=this.adminServ.getZeroUser();
    }

    SetUser(user: any) {
   
      this.user = user;
    }

}
