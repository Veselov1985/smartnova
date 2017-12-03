import { Injectable } from '@angular/core';

@Injectable()
export class TerminalEventsConfiguratorService {

  constructor() { }

  getCourentEventConfig(pk: string): any {
    const productConfig = 'Конфигурация события ' + pk;
    console.log(productConfig);
    return productConfig;
  }
  setCourentEventConfig(params: string): void {
    console.log('Событие записано в базу ' + params);
  }

}
