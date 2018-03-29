import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string, fields: string[]): any {
    query = query.toUpperCase();
    if (query) {
      return array.filter(item => {
        let match = false;
        if (fields) {
          fields.forEach((element, index) => {
            let val: string = '' + item[element];
            val = val.toUpperCase();
            if (val.indexOf(query) > -1) {
              match = true;
            }
          });
        }
        return match;
      });
    }
    return array;
  }

}
