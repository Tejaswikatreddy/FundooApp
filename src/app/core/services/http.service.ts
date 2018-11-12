import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class httpService {
  constructor(private http: HttpClient) { }

 NewPost(url,RequestBody,httpHeaders){
   return this.http.post(url, RequestBody, httpHeaders)
 }
 NewGet(url,httpHeaders){
   return this.http.get( url,  httpHeaders)
 }
  delete(url,httpHeaders) { 
    return this.http.delete(url, httpHeaders)

  }

}