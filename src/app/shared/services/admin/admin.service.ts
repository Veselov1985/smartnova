

import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { urlApi } from '../../url.api';


@Injectable()
export class AdminService {

    private baseUrl: string;

    private headers = new Headers({
        'Content-Type': 'application/json'
      });

constructor( private http: Http, private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => {
    this.baseUrl = isLoggedIn ? urlApi.server : urlApi.serverdemo;
  });

 }

 RemoveUser(Pk: string){
    const serviseUrl = this.baseUrl + ' RemoveUser';
    //public Guid? Pk
    return  this.http.post(serviseUrl, JSON.stringify({Pk:Pk}), {headers: this.headers})
    .map(res => res.json())
    .map(res => { 
        if (res.IsSuccess) {
        console.log(res);
        return res;
    }});

 }


 getListRole():Observable<any>{
    const serviseUrl = this.baseUrl + 'GetAllRoles';
    return  this.http.post(serviseUrl,null,{headers: this.headers})
   .map(res => res.json())
   .map(res => {
      if (res.IsSuccess) {
        console.log(res);
       return res;
    }});

 }


 AddOrEditUser(user){
    const serviseUrl = this.baseUrl + 'AddOrEditUser';
    return  this.http.post(serviseUrl,JSON.stringify(user),{headers: this.headers})
    .map(res => res.json())
    .map(res => { 
        if (res.IsSuccess) {
        console.log(res);
        return res;
    }});


 }


 getListUser(data: any) {

    const serviseUrl = this.baseUrl + 'GetAllUsersForTn';
   
   return  this.http.post(serviseUrl, JSON.stringify({Pk: data}), {headers: this.headers})
   .map(res => res.json())
   .map(res => {
    if (res.IsSuccess) {
        console.log(res);
        return res;
    }
   });
}


        getZeroUser(){
            return {
            Name: '',
            Email:'',
            Password: '',
            Phone: '',
            Confirm:'',
            AccountCreated: new Date(),
            LastLogin: new Date(),
            LogoPath:'',
            PatName:'',
            Pk:'',
            PostCode:'',
            SurName: '',
            TaxNumber: '',
            Tn:{ Pk:sessionStorage.getItem('TnPk'),Name:sessionStorage.getItem('TnId')},
            Role:{Pk:'',Name:''}
         }
        }

        setSettingsUser(value){
            let setUser=this.getZeroUser();
            setUser.Pk=value.Pk;
            setUser.Name=value.Name.split(' ')[0];
            setUser.SurName=value.Name.split(' ')[1];
            setUser.Role=value.Role;
            setUser.Password=value.Password;
            setUser.Email=value.Email;
            return setUser;

        }

        compareDataUser(listUser,user){
            console.log(user);
            console.log(listUser);

            let list,state;
            list = listUser.filter( (elem,i) => {
                if (elem.Pk !== user.Pk){
                    return true;
                } else {
                    return false;
                }
            });
            list.unshift(user);
        
            return list
        }
 }
