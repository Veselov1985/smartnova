
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AdminRole } from './../../../shared/models/admin-role';
import { User, UserTid} from './../../../shared/models';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges , SimpleChanges } from '@angular/core';
import { AdminService } from '../../../shared';
import {Observable} from 'rxjs/Observable';







@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.less']
})
export class NewUserComponent implements OnInit , OnChanges {
  @Input('user') user: UserTid;
  @Output() AddUser= new EventEmitter<FormGroup>();

  adminForm: FormGroup;

  options: Observable<any[]>;
 




    constructor(private admServ: AdminService) {
      this.adminForm = new FormGroup({
        Pk: new FormControl('', [Validators.required]),
        Name: new FormControl('', [Validators.required, Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')]),
        Role: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required, Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')]),
        Password: new FormControl('', [Validators.required, Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')])
      });
    }

    ngOnInit() {
      this.admServ.getListRole().subscribe( data => { this.options = data.Roles});
     this.adminForm.controls['Role'].setValue({Name:'Выбрать из списка',Pk:'1234567890'});
    }


    setValueForm(user: UserTid) {
      let role;
      switch (user.Role.Name) {
        case 'Администраттор':
          role = this.options[0];
          break;
        case 'Оператор':
        role = this.options[1];
          break;
        case 'Сервисный инженер':
        role = this.options[2];
          break;
          case 'Бухгалтер':
          role = this.options[3];
            break;
        default:
          role = '';
      }
      this.adminForm.setValue({
        Pk: this.user.Pk,
        Name: `${this.user.Name} ${this.user.SurName}`,
        Role: role,
        Email: this.user.Email,
        Password: this.user.Password
      });

    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['user']) {
       this.setValueForm(this.user);
      }
  }



    CreateNewUser() {
      let user;
      user= this.admServ.setSettingsUser(this.adminForm.value);
      this.AddUser.emit(user);
      this.adminForm.reset();
    }

}
