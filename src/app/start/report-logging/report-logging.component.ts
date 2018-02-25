import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-logging',
  templateUrl: './report-logging.component.html',
  styleUrls: ['./report-logging.component.less']
})
export class ReportLoggingComponent implements OnInit {
  logs: Array<any>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.logs = this.route.snapshot.data['logs'];
  }

}
