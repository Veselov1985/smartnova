import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilterTerminals'
})
export class MultiFilterTerminalsPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regId = new RegExp(multifilter.eid, 'i');
    const regName = new RegExp(multifilter.name, 'i');
    const regAddress = new RegExp(multifilter.address, 'i');
    return items.filter(item => {
      if (!regId.test(item.Id)) {
        return false;
      }
      if (!regName.test(item.Name)) {
        return false;
      }
      if (!regAddress.test(item.Address)) {
        return false;
      }
      if (multifilter.connection !== null && multifilter.connection !== item.Connection) {
        return false;
      }
      if (multifilter.service !== null && multifilter.service !== item.Service) {
        return false;
      }
      if (multifilter.failure !== null && multifilter.failure !== item.Failure) {
        return false;
      }
      if (item.SalesSum < multifilter.salesSumFrom && multifilter.salesSumFrom) {
        return false;
      }
      if (item.SalesSum > multifilter.salesSumTo && multifilter.salesSumTo) {
        return false;
      }
      if (item.CollectSum < multifilter.collectSumFrom && multifilter.collectSumFrom) {
        return false;
      }
      if (item.CollectSum > multifilter.collectSumTo && multifilter.collectSumTo) {
        return false;
      }
      return true;
    });
  }

}
