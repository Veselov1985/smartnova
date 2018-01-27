import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../shared';
import { StartModule } from './start.module';
import { ISignalRConnection } from 'ng2-signalr';

@Component({
  selector: 'app-start',
  animations: [slideInDownAnimation],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less'],
})

export class StartComponent implements OnInit {
  private connection: ISignalRConnection;

  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.connection = this.route.snapshot.data['connection'];
    console.log(this.connection);
  }
}
