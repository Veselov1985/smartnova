import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GetTerminalIngridientsService } from '../index';

@Injectable()
export class IngredientsResolver implements Resolve<any> {

    constructor(private serviceProd: GetTerminalIngridientsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.serviceProd.getIngredients(route.parent.params['terminalPk']).map(response => {
            return response.IsSuccess ? response.TerminalIngredients : null;
        });
    }
}
