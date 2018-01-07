import { Component, OnInit } from '@angular/core';
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
  constructor(private serviceProd: GetTerminalSellsService) { }

  ngOnInit() {
    this.serviceProd.getSell().subscribe(product => {
      this.items = product.TerminalSales;
    }, err => console.log(err));
    const mFilter = sessionStorage.getItem('sellsMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

}
