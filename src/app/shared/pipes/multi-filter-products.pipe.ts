import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from './isNumeric';

@Pipe({
  name: 'multiFilterProducts'
})
export class MultiFilterProductsPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regId = new RegExp(multifilter.Id, 'i');
    const regName = new RegExp(multifilter.Name, 'i');
    return items.filter(item => {
      if (!regId.test(item.Id)) {
        return false;
      }
      if (!regName.test(item.Name)) {
        return false;
      }
      if (item.BaseSum < multifilter.BaseSumFrom && isNumeric(multifilter.BaseSumFrom)) {
        return false;
      }
      if (item.BaseSum > multifilter.BaseSumTo && isNumeric(multifilter.BaseSumTo)) {
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
