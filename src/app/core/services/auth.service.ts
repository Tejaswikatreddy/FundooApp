import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getToken(){
    return localStorage.getItem("id")
  }
  setToken(token){
    localStorage.setItem("id",token)
  }
  removeToken(){
    localStorage.removeItem("id")
  }
}
