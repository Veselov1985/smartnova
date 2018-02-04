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
      const issuance = +item.IssuanceVol.slice(0, item.IssuanceVol.indexOf(' '));
      if (issuance < multifilter.IssuanceVolFrom && multifilter.IssuanceVolFrom) {
        return false;
      }
      if (issuance > multifilter.IssuanceVolTo && multifilter.IssuanceVolTo) {
        return false;
      }
      const download = +item.DownloadVol.slice(0, item.DownloadVol.indexOf(' '));
      if (download < multifilter.DownloadVolFrom && multifilter.DownloadVolFrom) {
        return false;
      }
      if (download > multifilter.DownloadVolTo && multifilter.DownloadVolTo) {
        return false;
      }
      const curVol = +item.CurrentVol.slice(0, item.CurrentVol.indexOf(' '));
      if (curVol < multifilter.CurrentVolFrom && multifilter.CurrentVolFrom) {
        return false;
      }
      if (curVol > multifilter.CurrentVolTo && multifilter.CurrentVolTo) {
        return false;
      }
      const threshold = +item.Threshold.slice(0, item.Threshold.indexOf(' '));
      if (threshold < multifilter.ThresholdFrom && multifilter.ThresholdFrom) {
        return false;
      }
      if (threshold > multifilter.ThresholdTo && multifilter.ThresholdTo) {
        return false;
      }
      return true;
    });
  }

}
