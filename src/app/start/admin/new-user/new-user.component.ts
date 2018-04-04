
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AdminRole } from './../../../shared/models/admin-role';
import { User, UserTid} from './../../../shared/models';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges , SimpleChanges } from '@angular/core';






@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.less']
})
export class NewUserComponent implements OnInit , OnChanges {
  @Input('user') user: UserTid;
  @Output() AddUser= new EventEmitter<FormGroup>();

  adminForm: FormGroup;

    options: AdminRole[]  = [
    {Name: 'Администратор', Pk: ''},
    {Name: 'Оператор', Pk: ''},
    {Name: 'Сервисный инженер', Pk: ''},
    {Name: 'Бухгалтер', Pk: ''}
  ];




    constructor() {
      this.adminForm = new FormGroup({
        Pk: new FormControl('', [Validators.required]),
        Name: new FormControl('', [Validators.required, Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')]),
        Role: new FormControl(this.options[0].Name),
        Email: new FormControl('', [Validators.required, Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')]),
        Password: new FormControl('', [Validators.required, Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')])
      });
    }

    ngOnInit() {
      this.setValueForm(this.user);
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
          role = this.options[0];
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
        console.log(this.user);
      }
  }



    CreateNewUser() {
      console.log(this.adminForm.value);
      this.AddUser.emit(this.adminForm);
      this.adminForm.reset();
    }

}
