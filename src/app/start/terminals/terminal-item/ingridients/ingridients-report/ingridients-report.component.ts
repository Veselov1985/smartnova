import { Component, OnInit } from '@angular/core';
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

  constructor(private serviceProd: GetTerminalIngridientsService) { }

  ngOnInit() {
    this.serviceProd.getIngredients().subscribe(product => {
      this.items = product.TerminalIngredients;
      return product;
    }, err => console.log(err));

    const mFilter = sessionStorage.getItem('ingrMultiFilter');
    if (mFilter) {
      this.multiFilter = JSON.parse(mFilter);
    }
  }

}
