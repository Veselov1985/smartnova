import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilterIngr'
})
export class MultiFilterIngredientsPipe implements PipeTransform {

  transform(items: any[], multifilter: any): any {
    if (!items || !multifilter) {
      return items;
    }
    const regId = new RegExp(multifilter.id, 'i');
    const regName = new RegExp(multifilter.name, 'i');
    return items.filter(item => {
      if (!regId.test(item.Pid)) {
        return false;
      }
      if (!regName.test(item.Name)) {
        return false;
      }
      const issuance = +item.IssuanceVol.slice(0, item.IssuanceVol.indexOf(' '));
      if (issuance < multifilter.issuanceVolFrom && multifilter.issuanceVolFrom) {
        return false;
      }
      if (issuance > multifilter.issuanceVolTo && multifilter.issuanceVolTo) {
        return false;
      }
      const download = +item.DownloadVol.slice(0, item.DownloadVol.indexOf(' '));
      if (download < multifilter.downloadVolFrom && multifilter.downloadVolFrom) {
        return false;
      }
      if (download > multifilter.downloadVolTo && multifilter.downloadVolTo) {
        return false;
      }
      const curVol = +item.CurrentVol.slice(0, item.CurrentVol.indexOf(' '));
      if (curVol < multifilter.currentVolFrom && multifilter.currentVolFrom) {
        return false;
      }
      if (curVol > multifilter.currentVolTo && multifilter.currentVolTo) {
        return false;
      }
      const threshold = +item.Threshold.slice(0, item.Threshold.indexOf(' '));
      if (threshold < multifilter.thresholdFrom && multifilter.thresholdFrom) {
        return false;
      }
      if (threshold > multifilter.thresholdTo && multifilter.thresholdTo) {
        return false;
      }
      return true;
    });
  }

}
