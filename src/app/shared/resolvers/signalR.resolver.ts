import { Resolve } from '@angular/router';
import { SignalR, ISignalRConnection } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class SignalRResolver implements Resolve<ISignalRConnection> {

    constructor(private _signalR: SignalR)  { }

    resolve() {
        return this._signalR.connect();
    }
}
