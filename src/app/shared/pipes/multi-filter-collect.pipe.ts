import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilterCollect'
})
export class MultiFilterCollectPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regName = new RegExp(multifilter.serviceman, 'i');
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
      if (!regName.test(item.ServiceMan)) {
        return false;
      }
      if (item.Collection < multifilter.collectionFrom && multifilter.collectionFrom) {
        return false;
      }
      if (item.Collection > multifilter.collectionTo && multifilter.collectionTo) {
        return false;
      }
      if (item.GivenChange < multifilter.givenChangeFrom && multifilter.givenChangeFrom) {
        return false;
      }
      if (item.GivenChange > multifilter.givenChangeTo && multifilter.givenChangeTo) {
        return false;
      }
      if (item.FundChange < multifilter.fundChangeFrom && multifilter.fundChangeFrom) {
        return false;
      }
      if (item.FundChange > multifilter.fundChangeTo && multifilter.fundChangeTo) {
        return false;
      }
      return true;
    });
  }

}
