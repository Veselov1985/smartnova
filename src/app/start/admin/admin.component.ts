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
    user: UserTid= {
      Name: '',
      Email: '',
      Password: '',
      Pk: '',
      Role: {Pk: '', Name: ''},
      SurName: ''
  };

    constructor( private adminServ: AdminService ) {

      this.adminServ.getListUser(sessionStorage.getItem('TnPk')).subscribe(data => this.users = data.Users);
    }



    ngOnInit() {
    }

    clearUser() {
      this.user = {
          Name: '',
          Email: '',
          Password: '',
          Pk: '',
          Role: {Pk: '', Name: ''},
          SurName: ''
      };

    }

    AddUserTab(user: any) {

        this.users.push(user.value);
        console.log(this.users);
        this.clearUser();
    }

    SetUser(user: any) {
      console.log('User in app', user);
      this.user = user;
    }

}
