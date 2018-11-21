import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authServices/auth.service';

@Injectable({
  providedIn: 'root'
})

export class httpService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };
  public httpO = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public httpImage = {
    headers: new HttpHeaders({
    })
  };;
  constructor(private http: HttpClient, private auth: AuthService) { }

  PostUrlEncoded(url, RequestBody) {
    return this.http.post(url, RequestBody, this.httpOptions)
  }
  PostnewPassword(url, RequestBody, token) {
    return this.http.post(url, RequestBody, this.httpOptions)
  }
  PostJson(url, RequestBody) {
    return this.http.post(url, RequestBody, this.httpO)
  }
  PostImage(url, RequestBody) {
    return this.http.post(url, RequestBody, this.httpImage)
  }
  post(url, RequestBody) {
    return this.http.post(url, RequestBody)
  }
  get(url) {
    return this.http.get(url, {})
  }
  getUrlEncoded(url) {
    return this.http.get(url, this.httpOptions)
  }
  getJson(url) {
    return this.http.get(url, this.httpO)
  }
  delete(url) {
    return this.http.delete(url, this.httpO)
  }

}