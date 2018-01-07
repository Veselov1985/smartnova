import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Terminal } from '../../../shared/models/terminal.model';
import { GetTerminalsService } from '../../../shared/index';

@Component({
  selector: 'app-terminals-report',
  templateUrl: './terminals-report.component.html',
  styleUrls: ['./terminals-report.component.less']
})
export class TerminalsReportComponent implements OnInit {
  terminals: Terminal[];
  multiFilter: any;
  date = new Date();
  constructor(private route: ActivatedRoute, private getTerminalsService: GetTerminalsService) { }

  ngOnInit() {
    this.getTerminalsService.getTerminals()
    .subscribe((data) => {
      if (data.IsSuccess) {
        this.terminals = data.Terminals;
      } else {
        this.terminals = [];
      }
    });
    // this.multiFilter = this.route.snapshot.queryParams;
    const mFilter = sessionStorage.getItem('terminalsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

}
