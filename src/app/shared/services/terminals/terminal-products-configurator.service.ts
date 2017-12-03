import { Injectable } from '@angular/core';

@Injectable()
export class TerminalProductsConfiguratorService {

  constructor() { }

  getCourentProductConfig(pk: string): any {
    const productConfig = 'Конфигурация продукта ' + pk;
    console.log(productConfig);
    return productConfig;
  }
  setCourentProductConfig(params: string): void {
    console.log('записано в базу ' + params);
  }
}
