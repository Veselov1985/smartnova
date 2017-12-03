import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    query = query.toUpperCase();
    if (query) {
      return array.filter(item => {
        let returnTrue = false;
        Object.keys(item).forEach((element, index) => {
          if (item[element] === true || item[element] === false) {
            return;
          }
          let val: string = '' + item[element];
          val = val.toUpperCase();
            if (val.indexOf(query) > -1) {
              returnTrue = true;
            }
        });
        return returnTrue;
      });
    }
    return array;
  }

}
