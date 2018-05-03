import { Pipe, PipeTransform } from '@angular/core';

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
        if (issuance < multifilter.IssuanceVolFrom && multifilter.IssuanceVolFrom) {
          return false;
        }
        if (issuance > multifilter.IssuanceVolTo && multifilter.IssuanceVolTo) {
          return false;
        }
      }
      if (item.DownloadVol) {
        const download = item.DownloadVol.match(/\d+/)[0];
        if (download < multifilter.DownloadVolFrom && multifilter.DownloadVolFrom) {
          return false;
        }
        if (download > multifilter.DownloadVolTo && multifilter.DownloadVolTo) {
          return false;
        }
      }
      if (item.CurrentVol) {
        const curVol = item.CurrentVol.match(/\d+/)[0];
        if (curVol < multifilter.CurrentVolFrom && multifilter.CurrentVolFrom) {
          return false;
        }
        if (curVol > multifilter.CurrentVolTo && multifilter.CurrentVolTo) {
          return false;
        }
      }
      if (item.Threshold) {
        const threshold = item.Threshold.match(/\d+/)[0];
        if (threshold < multifilter.ThresholdFrom && multifilter.ThresholdFrom) {
          return false;
        }
        if (threshold > multifilter.ThresholdTo && multifilter.ThresholdTo) {
          return false;
        }
      }
      return true;
    });
  }

}
