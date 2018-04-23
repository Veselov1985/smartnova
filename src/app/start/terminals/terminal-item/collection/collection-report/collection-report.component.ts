import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  tid: string;
  constructor(private serviceProd: GetTerminalCollectionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceProd.getTerminalCollection(this.route.snapshot.params['Pk']).subscribe(product => {
      this.items = product.TerminalIncaso;
    }, err => console.log(err));

    const mFilter = sessionStorage.getItem('collectMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }

    this.tid = sessionStorage.getItem('TnId');
  }

}
