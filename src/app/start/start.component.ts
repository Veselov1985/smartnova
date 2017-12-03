import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { slideInDownAnimation } from '../shared';
import { StartModule } from './start.module';

@Component({
  selector: 'app-start',
  animations: [slideInDownAnimation],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less'],
})

export class StartComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private router: Router) { }

  ngOnInit() {  }
}
