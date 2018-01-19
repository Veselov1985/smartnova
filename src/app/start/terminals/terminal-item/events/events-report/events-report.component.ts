import { Component, OnInit } from '@angular/core';
import { GetTerminalEventsService } from '../../../../../shared/index';
import { ShareDataService } from '../../../../../shared/services/common/share-data.service';

@Component({
  selector: 'app-events-report',
  templateUrl: './events-report.component.html',
  styleUrls: ['./events-report.component.less']
})
export class EventsReportComponent implements OnInit {
  events: any;
  multiFilter: any;
  date = new Date();
  constructor(private serviceProd: GetTerminalEventsService, private sharedData: ShareDataService) { }

  ngOnInit() {
    this.serviceProd.getEvents().subscribe(product => {
      this.events = product.TerminalEvents;
    }, err => console.log(err));

    // setTimeout(() => {
    //   this.events = this.sharedData.eventsData;
    // }, 500);
    // this.events = JSON.parse(sessionStorage.getItem('eventsData'));
    // console.log(this.events);

    const mFilter = sessionStorage.getItem('eventsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

}
