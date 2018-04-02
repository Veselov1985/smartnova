import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from './isNumeric';

@Pipe({
  name: 'multiFilterIngr'
})
export class MultiFilterIngredientsPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regId = new RegExp(multifilter.Pid, 'i');
    const regName = new RegExp(multifilter.Name, 'i');
    return items.filter(item => {
      if (!regId.test(item.Pid)) {
        return false;
      }
      if (!regName.test(item.Name)) {
        return false;
      }
      if (item.IssuanceVol) {
        const issuance = item.IssuanceVol.match(/\d+/)[0];
        if (issuance < multifilter.IssuanceVolFrom && isNumeric(multifilter.IssuanceVolFrom)) {
          return false;
        }
        if (issuance > multifilter.IssuanceVolTo && isNumeric(multifilter.IssuanceVolTo)) {
          return false;
        }
      }
      if (item.DownloadVol) {
        const download = item.DownloadVol.match(/\d+/)[0];
        if (download < multifilter.DownloadVolFrom && isNumeric(multifilter.DownloadVolFrom)) {
          return false;
        }
        if (download > multifilter.DownloadVolTo && isNumeric(multifilter.DownloadVolTo)) {
          return false;
        }
      }
      if (item.CurrentVol) {
        const curVol = item.CurrentVol.match(/\d+/)[0];
        if (curVol < multifilter.CurrentVolFrom && isNumeric(multifilter.CurrentVolFrom)) {
          return false;
        }
        if (curVol > multifilter.CurrentVolTo && isNumeric(multifilter.CurrentVolTo)) {
          return false;
        }
      }
      if (item.Threshold) {
        const threshold = item.Threshold.match(/\d+/)[0];
        if (threshold < multifilter.ThresholdFrom && isNumeric(multifilter.ThresholdFrom)) {
          return false;
        }
        if (threshold > multifilter.ThresholdTo && isNumeric(multifilter.ThresholdTo)) {
          return false;
        }
      }
      return true;
    });
  }

}
