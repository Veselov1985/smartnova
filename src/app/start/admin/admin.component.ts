import { AdminService } from './../../shared';
import { Observable } from 'rxjs/Observable';

import { User,UserTid} from './../../shared/models';
import { DataTableListComponent } from './dataTable-list/dataTable-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  users:UserTid[]=[];
  user:UserTid={
    Name:'',
    Email:'',
    Password:'',
    Pk: '',
    Role:'',
  };

  constructor( private adminServ:AdminService ) { 

    this.adminServ.getListUser(sessionStorage.getItem("TnPk")).subscribe(data=>this.users=data)
  }



  ngOnInit() {
    console.log('gg')
  }

  AddUserTab(user:any){
   console.log( user.value)
  console.log('app',user);
   this.users.push(user);
   console.log(this.users)

  }

}
