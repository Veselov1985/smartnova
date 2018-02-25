import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ReportLoggingService } from '../services/common/report-logging.service';

@Injectable()
export class ReportLoggingResolver implements Resolve<any> {

    constructor(private service: ReportLoggingService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getLogs();
    }
}
