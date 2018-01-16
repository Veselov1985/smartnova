import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TItemSells, GetTerminalSellsService } from '../../../../../shared/index';

@Component({
  selector: 'app-sells-report',
  templateUrl: './sells-report.component.html',
  styleUrls: ['./sells-report.component.less']
})
export class SellsReportComponent implements OnInit {
  items: TItemSells[];
  multiFilter: any;
  date = new Date();
  constructor(private serviceProd: GetTerminalSellsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceProd.getSell(this.route.snapshot.queryParams['pk']).subscribe(product => {
      this.items = product.TerminalSales;
    }, err => console.log(err));
    const mFilter = sessionStorage.getItem('sellsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

}
