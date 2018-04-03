
import { Validators,FormGroup,FormControl } from '@angular/forms';
import { AdminRole } from './../../../shared/models/admin-role';
import { User,UserTid} from './../../../shared/models';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';






@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.less']
})
export class NewUserComponent implements OnInit {
  @Input('user') user:UserTid;
  @Output() AddUser=new EventEmitter<FormGroup>();

  adminForm:FormGroup;

    options:AdminRole[]  = [
    {name: "Администратор"},
    {name: "Оператор"},
    {name: "Сервисный инженер"},
    {name: "Бухгалтер"}
  ]




    constructor() {
      this.adminForm= new FormGroup({
        Pk:new FormControl("", [Validators.required,]),
        Name:new FormControl("", [Validators.required,Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')]),
        Role:new FormControl(this.options[0].name),
        Email:new FormControl("", [Validators.required,Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')]),
        Password:new FormControl("", [Validators.required,Validators.pattern('^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$')])
        
      })
    }

    ngOnInit() {  
    this.setValueForm(this.user)
    }


    setValueForm(user:UserTid){
      let role;
      switch (user.Role) {
        case 'Администраттор':
          role=this.options[0];
          break;
        case 'Оператор':
        role=this.options[1];
          break;
        case 'Сервисный инженер':
        role=this.options[2];
          break;
          case 'Бухгалтер':
          role=this.options[3];
            break;
    
        default:
          role=this.options[0]
      }
      this.adminForm.setValue({
        Pk:this.user.Pk,
        Name:this.user.Name,
        Role:role,
        Email:this.user.Email,
        Password:this.user.Password
      })

    }



    CreateNewUser(){
      console.log(this.adminForm.value)
      this.AddUser.emit(this.adminForm);
      //this.clearUser();
     // this.adminForm.reset();
    }

    clearUser(){
      this.user={};
      this.user.Role="1";

    }

}
