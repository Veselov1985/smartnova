import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GetTerminalCollectionService } from '../index';

@Injectable()
export class CollectionResolver implements Resolve<any> {

    constructor(private serviceProd: GetTerminalCollectionService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.serviceProd.getTerminalCollection(route.parent.params['terminalPk']).map(response => {
            return response.IsSuccess ? response.TerminalIncaso : null;
        });
    }
}
