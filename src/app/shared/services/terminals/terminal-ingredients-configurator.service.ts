import { Injectable } from '@angular/core';

@Injectable()
export class TerminalIngredientsConfiguratorService {

  constructor() { }

  getCourentIngredientConfig(pk: string): any {
    const productConfig = 'Конфигурация ингредиента ' + pk;
    console.log(productConfig);
    return productConfig;
  }
  setCourentIngredientConfig(params: string): void {
    console.log('Настройки ингредиента записаны в базу ' + params);
  }

}
