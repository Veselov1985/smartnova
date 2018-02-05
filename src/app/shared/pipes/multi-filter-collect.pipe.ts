import { Pipe, PipeTransform } from '@angular/core';

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
      if (item.Collection < multifilter.CollectionFrom && multifilter.CollectionFrom) {
        return false;
      }
      if (item.Collection > multifilter.CollectionTo && multifilter.CollectionTo) {
        return false;
      }
      if (item.GivenChange < multifilter.GivenChangeFrom && multifilter.GivenChangeFrom) {
        return false;
      }
      if (item.GivenChange > multifilter.GivenChangeTo && multifilter.GivenChangeTo) {
        return false;
      }
      if (item.FundChange < multifilter.FundChangeFrom && multifilter.FundChangeFrom) {
        return false;
      }
      if (item.FundChange > multifilter.FundChangeTo && multifilter.FundChangeTo) {
        return false;
      }
      return true;
    });
  }

}
