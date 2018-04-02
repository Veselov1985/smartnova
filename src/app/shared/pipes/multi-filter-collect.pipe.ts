import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from './isNumeric';

@Pipe({
  name: 'multiFilterCollect'
})
export class MultiFilterCollectPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regName = new RegExp(multifilter.ServiceMan, 'i');
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
      if (!regName.test(item.ServiceMan)) {
        return false;
      }
      if (item.Collection < multifilter.CollectionFrom && isNumeric(multifilter.CollectionFrom)) {
        return false;
      }
      if (item.Collection > multifilter.CollectionTo && isNumeric(multifilter.CollectionTo)) {
        return false;
      }
      if (item.GivenChange < multifilter.GivenChangeFrom && isNumeric(multifilter.GivenChangeFrom)) {
        return false;
      }
      if (item.GivenChange > multifilter.GivenChangeTo && isNumeric(multifilter.GivenChangeTo)) {
        return false;
      }
      if (item.FundChange < multifilter.FundChangeFrom && isNumeric(multifilter.FundChangeFrom)) {
        return false;
      }
      if (item.FundChange > multifilter.FundChangeTo && isNumeric(multifilter.FundChangeTo)) {
        return false;
      }
      return true;
    });
  }

}
