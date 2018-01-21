import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GetEventsStatsService } from '../index';

@Injectable()
export class EventsStatsResolver implements Resolve<any> {

    constructor(private statsService: GetEventsStatsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.statsService.getTerminalEventsStats(route.queryParams).map(response => {
            return response.IsSuccess ? response.AllTerminalEventsByType : null;
        });
    }
}
