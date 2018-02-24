import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation, urlApi } from '../shared';
import { StartModule } from './start.module';
import { ISignalRConnection, ConnectionStatus } from 'ng2-signalr';

import { SignalRService } from '../shared/services/auth/signalr.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-start',
  animations: [slideInDownAnimation],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less'],
})

export class StartComponent implements OnInit, OnDestroy {
  private connection: ISignalRConnection;
  private signalrSubscritption: Subscription;
  userId: string;
  groupId: string;
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private route: ActivatedRoute, private signalRService: SignalRService) { }

  ngOnInit() {
    this.connection = this.route.snapshot.data['connection'];
    const onMessageSent$  = this.connection.listenFor('salemessage');
    const onMessageEventSent$  = this.connection.listenFor('eventmessage');
    onMessageSent$.subscribe(resp => {
      console.log('Sale!', resp);
    });
    onMessageEventSent$.subscribe(resp => {
      console.log('Event', resp);
    });

    this.userId = sessionStorage.getItem('UserPk');
    this.groupId = sessionStorage.getItem('TnPk');
    if (!this.userId) {
        this.userId = this.signalRService.getUserDemoId();
        this.groupId = this.signalRService.getGroupDemoId();
        this.signalRService.setDemoMode();
    }

    const isSignalROn = JSON.parse(localStorage.getItem('signalR'));
    if (isSignalROn) {
      this.connect(this.userId, this.groupId, true);
    }

    this.signalrSubscritption = this.signalRService.signalRToggle$.subscribe((status: boolean) => {
      this.connect(this.userId, this.groupId, status);
    });
  }

  connect(userId: string, groupId: string, status: boolean) {
    if (status) {
      this.connection.invoke('connect', userId, groupId).then((data) => {
        if (this.signalRService.isDemoMode) {
          this.signalRService.startDemo(userId).subscribe(resp => {
            console.log(resp);
          });
        }
      }).catch(err => console.log(err));
    } else {
      this.connection.invoke('Disconnect', userId).then(data => {
        console.log(this.signalRService.isDemoMode);
        if (this.signalRService.isDemoMode) {
          this.signalRService.stopDemo(userId).subscribe(resp => {
            console.log(resp);
          });
          this.signalRService.disableDemoMode();
        }
      }).catch(err => console.log(err));
    }
  }

  ngOnDestroy() {
    if (this.signalrSubscritption) {
      this.signalrSubscritption.unsubscribe();
    }
    this.connect(this.userId, this.groupId, false);
  }
}
