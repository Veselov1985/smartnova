import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GetTerminalProductsService } from '../../../../../shared/index';
import { Terminal } from './../../../../../shared/models/terminal.model';

@Component({
  selector: 'app-products-report',
  templateUrl: './products-report.component.html',
  styleUrls: ['./products-report.component.less']
})
export class ProductsReportComponent implements OnInit {
  terminal: Terminal;
  items: any[];
  multiFilter: any;
  date = new Date();
  tid: string;

  constructor(
    private route: ActivatedRoute,
    private serviceProd: GetTerminalProductsService
  ) { }

  ngOnInit() {
    this.terminal = JSON.parse(sessionStorage.getItem('ItemProduct'));
    this.serviceProd.getTerminalProducts(this.route.snapshot.params['Pk'])
    .subscribe(product => {
      if (product.IsSuccess) {
        this.items = product.TerminalGoods;
      } else {
        this.items = [];
      }
    },
    err => {
      console.log(err);
    });
    this.multiFilter = this.route.snapshot.queryParams;

    this.tid = sessionStorage.getItem('TnId');
  }

}
