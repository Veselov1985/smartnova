import { Component, OnInit } from '@angular/core';
import { TItemCollections, GetTerminalCollectionService } from '../../../../../shared/index';

@Component({
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',
  styleUrls: ['./collection-report.component.less']
})
export class CollectionReportComponent implements OnInit {
  items: TItemCollections[];
  multiFilter: any;
  date = new Date();
  constructor(private serviceProd: GetTerminalCollectionService) { }

  ngOnInit() {
    this.serviceProd.getTerminalCollection().subscribe(product => {
      this.items = product.TerminalIncaso;
    }, err => console.log(err));

    const mFilter = sessionStorage.getItem('collectMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

}
