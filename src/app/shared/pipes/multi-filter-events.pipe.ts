import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from './isNumeric';

@Pipe({
  name: 'multiFilterEvents'
})
export class MultiFilterEventsPipe implements PipeTransform {

  transform(items: any[], multifilter: any, type?: string): any {
    if (!items || !multifilter || !multifilter.eventTypes.includes(type)) {
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
      if (item.TotalNumber < multifilter.TotalNumberFrom && isNumeric(multifilter.TotalNumberFrom)) {
        return false;
      }
      if (item.TotalNumber > multifilter.TotalNumberTo && isNumeric(multifilter.TotalNumberTo)) {
        return false;
      }
      if (item.Duration < multifilter.DurationFrom && isNumeric(multifilter.DurationFrom)) {
        return false;
      }
      if (item.Duration > multifilter.DurationTo && isNumeric(multifilter.DurationTo)) {
        return false;
      }
      if (multifilter.Viewed !== null && multifilter.Viewed !== item.Viewed) {
        return false;
      }
      return true;
    });
  }

}
