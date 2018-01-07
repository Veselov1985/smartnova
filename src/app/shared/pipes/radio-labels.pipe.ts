import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'radioValueTransform'
})
export class RadioLabelsPipe implements PipeTransform {

  transform(value: boolean): any {
    return value === null ? 'Все' : value === true ? 'Есть' : 'Нет';
  }

}
