import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilterSells'
})
export class MultiFilterSellsPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regName = new RegExp(multifilter.Name, 'i');
    const searchDateFrom = new Date(multifilter.DateTimeFrom);
    const searchDateTo = new Date(multifilter.DateTimeTo);
    return items.filter(item => {
      const date = new Date(item.DateTime);
      if (date < searchDateFrom && multifilter.DateTimeFrom) {
        return false;
      }
      if (date > searchDateTo && multifilter.DateTimeTo) {
        return false;
      }
      if (!regName.test(item.Name)) {
        return false;
      }
      if (item.Summ < multifilter.SummFrom && multifilter.SummFrom) {
        return false;
      }
      if (item.Summ > multifilter.SummTo && multifilter.SummTo) {
        return false;
      }
      if (item.SoldNumber < multifilter.SoldNumberFrom && multifilter.SoldNumberFrom) {
        return false;
      }
      if (item.SoldNumber > multifilter.SoldNumberTo && multifilter.SoldNumberTo) {
        return false;
      }
      if (item.SoldSum < multifilter.SoldSumFrom && multifilter.SoldSumFrom) {
        return false;
      }
      if (item.SoldSum > multifilter.SoldSumTo && multifilter.SoldSumTo) {
        return false;
      }
      return true;
    });
  }

}
