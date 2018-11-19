import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class httpService {
  public httpOptions; 
  public httpO; 
  public httpImage; 
  constructor(private http: HttpClient) { }

 PostUrlEncoded(url,RequestBody){
   this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
   return this.http.post(url, RequestBody, this.httpOptions)
 }
 PostnewPassword(url,RequestBody,token){
   this.httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization': token
     })
   };
   return this.http.post(url, RequestBody, this.httpOptions)
 }
 PostJson(url,RequestBody){
   this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    return this.http.post(url, RequestBody, this.httpO)
 }
 PostImage(url,RequestBody){
    this.httpImage = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('id')
      })
    };
  return this.http.post(url, RequestBody, this.httpImage)
 }
 post(url,RequestBody){
   return this.http.post(url, RequestBody)
 }
 get(url){
   return this.http.get(url)
 }
 getUrlEncoded(url){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
   return this.http.get( url,   this.httpOptions)
 }
 getJson(url){
   this.httpO = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': localStorage.getItem('id')
     })
   };
   return this.http.get(url, this.httpO)

 }
  delete(url) { 
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    return this.http.delete(url, this.httpO)

  }

}