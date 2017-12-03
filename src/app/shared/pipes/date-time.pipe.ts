import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string, format: string) {
    const indexCharT = value.indexOf('T');
      if (value && format === 'time') {
        const indexChar = indexCharT + 1;
        const lastIndexChar = value.lastIndexOf(':');
        return value.substring(indexChar, lastIndexChar);
      } else if (value && format === 'date') {
        const datePipe = new DatePipe('ru');
        const newDate = datePipe.transform(value.substring(0, indexCharT));
        return newDate;
      } else {
        return '';
      }
  }

}
