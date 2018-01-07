import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilterSells'
})
export class MultiFilterSellsPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regName = new RegExp(multifilter.name, 'i');
    const searchDateFrom = new Date(multifilter.dateSearchFrom);
    const searchDateTo = new Date(multifilter.dateSearchTo);
    return items.filter(item => {
      const date = new Date(item.DateTime);
      if (date < searchDateFrom && multifilter.dateSearchFrom) {
        return false;
      }
      if (date > searchDateTo && multifilter.dateSearchTo) {
        return false;
      }
      if (!regName.test(item.Name)) {
        return false;
      }
      if (item.Summ < multifilter.priceFrom && multifilter.priceFrom) {
        return false;
      }
      if (item.Summ > multifilter.priceTo && multifilter.priceTo) {
        return false;
      }
      if (item.SoldNumber < multifilter.soldNumberFrom && multifilter.soldNumberFrom) {
        return false;
      }
      if (item.SoldNumber > multifilter.soldNumberTo && multifilter.soldNumberTo) {
        return false;
      }
      if (item.SoldSum < multifilter.soldSumFrom && multifilter.soldSumFrom) {
        return false;
      }
      if (item.SoldSum > multifilter.soldSumTo && multifilter.soldSumTo) {
        return false;
      }
      return true;
    });
  }

}
