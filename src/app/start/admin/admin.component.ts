import { AdminService } from './../../shared';
import { Observable } from 'rxjs/Observable';

import { User, UserTid} from './../../shared/models';
import { DataTableListComponent } from './dataTable-list/dataTable-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
    users: UserTid[]= [];
    user: UserTid;

    constructor( private adminServ: AdminService ) {
      this.user=this.adminServ.getZeroUser();
      this.adminServ.getListUser(sessionStorage.getItem('TnPk')).subscribe(data => this.users = data.Users);
  
    }



    ngOnInit() {
     
    }

   


    AddUserTab(user: any) {

        //this.users.push(user);

        this.adminServ.AddOrEditUser(user).subscribe(data =>{ 
            let res=this.adminServ.compareDataUser(this.users,data.UserPk);
            this.users = this.adminServ.compareDataUser(this.users,data.UserPk)
        })
        console.log(this.user);
        this.user=this.adminServ.getZeroUser();
    }

    SetUser(user: any) {
      console.log('User in app', user);
      this.user = user;
    }

}
