import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GetTerminalEventsService } from '../index';

@Injectable()
export class EventsResolver implements Resolve<any> {

    constructor(private serviceProd: GetTerminalEventsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.serviceProd.getEvents(route.parent.params['terminalPk']).map(response => {
            return response.IsSuccess ? response.TerminalEvents : null;
        });
    }
}
