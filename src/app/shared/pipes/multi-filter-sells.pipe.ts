import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from './isNumeric';

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
      if (item.Summ < multifilter.SummFrom && isNumeric(multifilter.SummFrom)) {
        return false;
      }
      if (item.Summ > multifilter.SummTo && isNumeric(multifilter.SummTo)) {
        return false;
      }
      if (item.SoldNumber < multifilter.SoldNumberFrom && isNumeric(multifilter.SoldNumberFrom)) {
        return false;
      }
      if (item.SoldNumber > multifilter.SoldNumberTo && isNumeric(multifilter.SoldNumberTo)) {
        return false;
      }
      if (item.SoldSum < multifilter.SoldSumFrom && isNumeric(multifilter.SoldSumFrom)) {
        return false;
      }
      if (item.SoldSum > multifilter.SoldSumTo && isNumeric(multifilter.SoldSumTo)) {
        return false;
      }
      return true;
    });
  }

}
