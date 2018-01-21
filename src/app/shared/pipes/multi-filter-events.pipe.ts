import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilterEvents'
})
export class MultiFilterEventsPipe implements PipeTransform {

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
      if (item.TotalNumber < multifilter.totalNumberFrom && multifilter.totalNumberFrom) {
        return false;
      }
      if (item.TotalNumber > multifilter.totalNumberTo && multifilter.totalNumberTo) {
        return false;
      }
      if (item.Duration < multifilter.durationFrom && multifilter.durationFrom) {
        return false;
      }
      if (item.Duration > multifilter.durationTo && multifilter.durationTo) {
        return false;
      }
      if (multifilter.viewed !== null && multifilter.viewed !== item.Viewed) {
        return false;
      }
      return true;
    });
  }

}
