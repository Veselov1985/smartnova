import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilterProducts'
})
export class MultiFilterProductsPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regId = new RegExp(multifilter.id, 'i');
    const regName = new RegExp(multifilter.name, 'i');
    return items.filter(item => {
      if (!regId.test(item.Id)) {
        return false;
      }
      if (!regName.test(item.Name)) {
        return false;
      }
      if (item.BaseSum < multifilter.basePriceFrom && multifilter.basePriceFrom) {
        return false;
      }
      if (item.BaseSum > multifilter.basePriceTo && multifilter.basePriceTo) {
        return false;
      }
      if (item.SoldNumber < multifilter.soldNumberFrom && multifilter.soldNumberFrom) {
        return false;
      }
      if (item.SoldNumber > multifilter.soldNumberTo && multifilter.soldNumberTo) {
        return false;
      }
      if (item.SoldSum < multifilter.soldSumFrom && multifilter.soldSumFrom) {
        return false;
      }
      if (item.SoldSum > multifilter.soldSumTo && multifilter.soldSumTo) {
        return false;
      }
      return true;
    });
  }

}
