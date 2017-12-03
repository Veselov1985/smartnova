import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.less']
})
export class HeaderHomeComponent implements OnInit {

  public state = 'inactive';

  constructor() { }

  ngOnInit() {
  }

  openCloseSidebar(ev: any) {
    ev.preventDefault();
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}
