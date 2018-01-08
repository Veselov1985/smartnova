import { Component, OnInit } from '@angular/core';
import { GetTerminalEventsService } from '../../../../../shared/index';

@Component({
  selector: 'app-events-report',
  templateUrl: './events-report.component.html',
  styleUrls: ['./events-report.component.less']
})
export class EventsReportComponent implements OnInit {
  events: any;
  multiFilter: any;
  date = new Date();
  constructor(private serviceProd: GetTerminalEventsService) { }

  ngOnInit() {
    this.serviceProd.getEvents().subscribe(product => {
      this.events = product.TerminalEvents;
      console.log(this.events);
    }, err => console.log(err));

    const mFilter = sessionStorage.getItem('eventsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

}
