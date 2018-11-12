import { Injectable } from '@angular/core';
import { httpService } from './http.service';
import {  HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // URL = "http://34.213.106.173/api";
  URL = environment.URL;

public url;
public access_token=localStorage.getItem('id');
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.access_token
    })
  };
  constructor(private service: httpService) { }

  loginPost(RequestBody){
    this.url = this.URL+"/user/login";
    return this.service.NewPost(this.url,RequestBody,{})
  }
  signupPost(RequestBody){
    this.url = this.URL +"/user/userSignUp";
    return this.service.NewPost(this.url, RequestBody, {})

  }
  getCards(){
    this.url = this.URL +"/user/service";
    return this.service.NewGet(this.url,{})
  }
  resetPassword(RequestBody){
    this.url = this.URL +"/user/reset";
    return this.service.NewPost(this.url, RequestBody, {})
    
  }
  logout(RequestBody){
    this.url = this.URL +"/user/logout";
    return this.service.NewPost(this.url, RequestBody, this.httpOptions)

  }
  setPassword(RequestBody){
    
    this.url = this.URL +"/user/reset-password";
    return this.service.NewPost(this.url, RequestBody, this.httpOptions)

  }
}
