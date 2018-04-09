import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetTerminalEventsService } from '../../../../../shared/index';

@Component({
  selector: 'app-events-report',
  templateUrl: './events-report.component.html',
  styleUrls: ['./events-report.component.less']
})
export class EventsReportComponent implements OnInit, OnDestroy {
  events = {
    Operational: null,
    System: null,
    Uncertain: null,
    Custom: null
  };
  multiFilter: any;
  date = new Date();
  constructor(private serviceProd: GetTerminalEventsService) { }

  ngOnInit() {
    this.events.Operational = JSON.parse(sessionStorage.getItem('operationalEvents'));
    this.events.System = JSON.parse(sessionStorage.getItem('systemEvents'));
    this.events.Uncertain = JSON.parse(sessionStorage.getItem('uncertainEvents'));

    const mFilter = sessionStorage.getItem('eventsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('operationalEvents');
    sessionStorage.removeItem('systemEvents');
    sessionStorage.removeItem('uncertainEvents');
  }
}
