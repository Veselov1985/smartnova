import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation, urlApi } from '../shared';
import { StartModule } from './start.module';
import { ISignalRConnection, ConnectionStatus } from 'ng2-signalr';

import { SignalRService } from '../shared/services/auth/signalr.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-start',
  animations: [slideInDownAnimation],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less'],
})

export class StartComponent implements OnInit, OnDestroy {
  private connection: ISignalRConnection;
  private signalrSubscritption: Subscription;
  private saleSubscritption: Subscription;
  private eventSubscritption: Subscription;
  userId: string;
  groupId: string;
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(
    private route: ActivatedRoute,
    private signalRService: SignalRService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.connection = this.route.snapshot.data['connection'];
    this.signalRService.onSaleSent$ = this.connection.listenFor('salemessage');
    this.signalRService.onEventSent$ = this.connection.listenFor('eventmessage');
    this.saleSubscritption = this.signalRService.onSaleSent$.subscribe(resp => {
      this.snackBarShow(JSON.parse(<string>resp).Notification);
    });
    this.eventSubscritption = this.signalRService.onEventSent$.subscribe(resp => {
      this.snackBarShow(JSON.parse(<string>resp).Notification);
    });

    this.userId = sessionStorage.getItem('UserPk');
    this.groupId = sessionStorage.getItem('TnPk');
    if (!this.userId) {
        this.userId = this.signalRService.getUserDemoId();
        this.groupId = this.signalRService.getGroupDemoId();
    }

    const isSignalROn = JSON.parse(sessionStorage.getItem('signalR'));
    if (isSignalROn || isSignalROn === null) {
      this.connect(this.userId, this.groupId, true);
    }

    this.signalrSubscritption = this.signalRService.signalRToggle$.subscribe((status: boolean) => {
      this.connect(this.userId, this.groupId, status);
    });
  }

  connect(userId: string, groupId: string, status: boolean) {
    if (!sessionStorage.getItem('UserPk')) {
      this.signalRService.setDemoMode();
    }
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
        if (this.signalRService.isDemoMode) {
          this.signalRService.stopDemo(userId).subscribe(resp => {
            console.log(resp);
          });
          this.signalRService.disableDemoMode();
        }
      }).catch(err => console.log(err));
    }
  }

  snackBarShow(message) {
    return this.snackBar.open(message, 'Закрыть', {
      duration: 5000,
      horizontalPosition: 'right'
    });
  }

  ngOnDestroy() {
    if (this.signalrSubscritption) {
      this.signalrSubscritption.unsubscribe();
    }
    if (this.saleSubscritption) {
      this.saleSubscritption.unsubscribe();
    }
    if (this.eventSubscritption) {
      this.eventSubscritption.unsubscribe();
    }
    this.connect(this.userId, this.groupId, false);
  }
}
