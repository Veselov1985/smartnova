

import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';




import { urlApi } from '../../url.api';


@Injectable()
export class AdminService {

    private baseUrl:string;

    private headers = new Headers({
        'Content-Type': 'application/json'
      });

     

constructor( private http:Http,private auth:AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
    this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
  })

 }


 getListUser(data:any){
    const serviseUrl = this.baseUrl + 'GetAllUsersForTn';
    console.log( serviseUrl);
   return  this.http.post(serviseUrl,JSON.stringify({Pk:data}),{headers:this.headers})
   .map(res=> res.json())
   .map(res=>{
      
    if(res.IsSuccess){
        console.log(res)
        return res;
    }

   })
  
 }

}