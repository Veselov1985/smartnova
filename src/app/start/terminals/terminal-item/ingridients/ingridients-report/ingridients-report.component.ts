import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TItemIngridients, GetTerminalIngridientsService } from '../../../../../shared/index';

@Component({
  selector: 'app-ingridients-report',
  templateUrl: './ingridients-report.component.html',
  styleUrls: ['./ingridients-report.component.less']
})
export class IngridientsReportComponent implements OnInit {
  items: TItemIngridients[];
  multiFilter: any;
  date = new Date();
  tid: string;

  constructor(private serviceProd: GetTerminalIngridientsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceProd.getIngredients(this.route.snapshot.params['Pk']).subscribe(product => {
      this.items = product.TerminalIngredients;
      return product;
    }, err => console.log(err));

    const mFilter = sessionStorage.getItem('ingrMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }

    this.tid = sessionStorage.getItem('TnId');
  }

}
