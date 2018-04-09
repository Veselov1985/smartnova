import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { Observable } from 'rxjs/Observable';
import { AuthService, User, emailMatcher } from '../../../shared/shared';
import {
  GetTerminalsService,
  triggerUserPanelState,
  triggerPanelState,
  StateUserpanelService,
  ClientDataService
} from '../../../shared';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-sidebar-start',
  templateUrl: './sidebar-start.component.html',
  styleUrls: ['./sidebar-start.component.less'],
  animations: [triggerPanelState, triggerUserPanelState],
})

export class SidebarStartComponent implements OnInit {
  tab = 1;
  userData: User;
  loginForm: FormGroup;
  passwordForm: FormGroup;
  errorFromServer: string;

  public state = 'inactive';

  constructor(
    private rootComp: AppComponent,
    private service: GetTerminalsService,
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private StateUserpanel: StateUserpanelService,
    private clientDataService: ClientDataService,
  ) {
    StateUserpanel.stateChange$.subscribe(stateConfig => this.state = stateConfig);
  }

  ngOnInit() {

    this.clientDataService.getClientData().subscribe(res => {
      this.userData = res.User || {};
      if (res.IsSuccess) {
        this.loginForm.patchValue({
          SurName: this.userData.SurName,
          Name: this.userData.Name,
          PatName: this.userData.PatName,
          TaxNumber: this.userData.TaxNumber,
          PostCode: this.userData.PostCode,
          Phone: this.userData.Phone,
          Email: this.userData.Email,
          Tn: this.userData.Tn.Name
        });
      }

    });
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this.loginForm = this.fb.group({
      SurName: ['', [Validators.pattern('^[а-яА-Яa-zA-Z -]+$'), Validators.maxLength(30)]],
      Name: ['', [Validators.pattern('^[а-яА-Яa-zA-Z -]+$'), Validators.maxLength(30)]],
      PatName: ['', [Validators.pattern('^[а-яА-Яa-zA-Z -]+$'), Validators.maxLength(30)]],
      TaxNumber: ['', [Validators.pattern('^[0-9]+$')]],
      PostCode: ['', Validators.maxLength(150)],
      Phone: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(15)]],
      Email: [{ value: '', disabled: true }],
      Tn: [{ value: '', disabled: true }]
    });
    this.passwordForm = this.fb.group({
      OldPassword: ['', [Validators.required, Validators.minLength(6)]],
      Password: this.fb.group({
        Check: ['', [Validators.required, Validators.minLength(6)]],
        Confirm: ['', Validators.required]
      }, { validator: emailMatcher })
    });
  }

  onSubmitLogin({ value, valid }: { value: User, valid: boolean }) {
    this.clientDataService.editClientData(Object.assign(
      {}, value,
      { Pk: this.userData.Pk, Tn: { Pk: this.userData.Tn.Pk, Name: this.userData.Tn.Name } }
    )).subscribe(res => {
      if (res.IsSuccess) {
        this.openCloseSidebar(null);
        //  this.router.navigate(['/start']);
      } else {
        this.errorFromServer = res.Message;
      }
    });
    // this.loginForm.reset();
  }
  onSubmitPassword({ value, valid }: { value: User, valid: boolean }) {
    this.authService.changePassword(value).subscribe(res => {
      if (res.IsSuccess) {
        //  this.openCloseSidebar(null);
        this.setTab(3, null);
        setTimeout(() => {
          this.openCloseSidebar(null);
        }, 2500);
        //  this.router.navigate(['/start']);
      } else {
        this.errorFromServer = res.Message;
      }
    });
    // this.loginForm.reset();
  }



  openCloseSidebar(ev: any) {
    // event.stopPropagation();
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.StateUserpanel.setStateUserpanel(this.state);
    this.setTab(1, ev);
    return false;
  }

  setTab(num: number, ev: any) {
    if (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    }
    this.tab = num;
  }
}
