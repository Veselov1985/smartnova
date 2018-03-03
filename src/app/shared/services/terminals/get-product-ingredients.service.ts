import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { urlApi } from '../../url.api';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class GetProductIngredientsService {
    baseUrl: string;

    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(public http: Http, private auth: AuthService) {
        // this.Pk = sessionStorage.getItem('productPk');
        this.auth.isLoggedIn.subscribe(isLoggedIn => {
            this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
        });
    }

    getIngredients(Pk: string): Observable<any> {
        const serviseUrl = this.baseUrl + 'GetGoodsIngredients';
        return this.http.post(serviseUrl, JSON.stringify({ Pk: Pk }), { headers: this.headers })
                .map(response => response.json());
    }
}
