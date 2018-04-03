import { Pipe, PipeTransform } from '@angular/core';

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
      if (item.BaseSum < multifilter.BaseSumFrom && multifilter.BaseSumFrom) {
        return false;
      }
      if (item.BaseSum > multifilter.BaseSumTo && multifilter.BaseSumTo) {
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
