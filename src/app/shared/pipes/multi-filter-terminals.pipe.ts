import {Pipe, PipeTransform} from '@angular/core';
import {GetTerminalsService} from '../services/terminals';

@Pipe({
  name: 'multiFilterTerminals'
})
export class MultiFilterTerminalsPipe implements PipeTransform {
  constructor(
    private _terminalService: GetTerminalsService
  ) {
  }
  transform(items: any[], multifilter: any): any {
    // Fixed to two digits after the whole part
    items = this._terminalService.__toFixedTerminalSaleSum(items);
    if (!items || !multifilter) {
      return items;
    }
    const regId = new RegExp(multifilter.Id, 'i');
    const regName = new RegExp(multifilter.Name, 'i');
    const regAddress = new RegExp(multifilter.Address, 'i');
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
      if (multifilter.Connection !== null && multifilter.Connection !== item.Connection) {
        return false;
      }
      if (multifilter.Service !== null && multifilter.Service !== item.Service) {
        return false;
      }
      if (multifilter.Failure !== null && multifilter.Failure !== item.Failure) {
        return false;
      }
      if (item.SalesSum < multifilter.SalesSumFrom && multifilter.SalesSumFrom) {
        return false;
      }
      if (item.SalesSum > multifilter.SalesSumTo && multifilter.SalesSumTo) {
        return false;
      }
      if (item.CollectSum < multifilter.CollectSumFrom && multifilter.CollectSumFrom) {
        return false;
      }
      if (item.CollectSum > multifilter.CollectSumTo && multifilter.CollectSumTo) {
        return false;
      }
      return true;
    });
  }
}
