import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authServices/auth.service';

@Injectable({
  providedIn: 'root'
})

export class httpService {
  public httpOptions; 
  public httpO; 
  public httpImage; 
  constructor(private http: HttpClient,private auth:AuthService) { }

 PostUrlEncoded(url,RequestBody){
   this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
   return this.http.post(url, RequestBody, this.httpOptions)
 }
 PostnewPassword(url,RequestBody,token){
   this.httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
     })
   };
   return this.http.post(url, RequestBody, this.httpOptions)
 }
 PostJson(url,RequestBody){
   this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, RequestBody, this.httpO)
 }
 PostImage(url,RequestBody){
    this.httpImage = {
      headers: new HttpHeaders({
      })
    };
  return this.http.post(url, RequestBody, this.httpImage)
 }
 post(url,RequestBody){
   return this.http.post(url, RequestBody)
 }
 get(url){
   return this.http.get(url,{})
 }
 getUrlEncoded(url){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
   return this.http.get( url,this.httpOptions)
 }
 getJson(url){
   this.httpO = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     })
   };
   return this.http.get(url, this.httpO)

 }
  delete(url) { 
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete(url, this.httpO)

  }

}