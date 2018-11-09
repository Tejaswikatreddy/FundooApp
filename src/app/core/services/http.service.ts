import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import {Observable} from 'rxjs/Observable'
@Injectable({
  providedIn: 'root'
})

export class httpService {
 URL = "http://34.213.106.173/api";
  constructor(private http: HttpClient) { }
  getData(name){
    return this.http.get(this.URL+"/"+name);
  }
  postData(name,body){
    console.log(body)
    return this.http.post(this.URL+"/"+name,body);
  }
  post(name,input,access_token){
    // console.log(input);
    // console.log(access_token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    // console.log(this.getFormUrlEncoded(input))
    return this.http.post(this.URL+"/"+name,this.getFormUrlEncoded(input),httpOptions)
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  get(name,token){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    })
  }
    return this.http.get(this.URL + "/" + name,httpOptions);
  }

postDel(name, input, access_token){
 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': access_token
    })
  };
  console.log(access_token)

  return this.http.post(this.URL + "/" + name, input, httpOptions)
}
delete(name,token){
  // var url = `${this.URL + "/" + name}/${id}/${"deleteNoteLabel"}`;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };
  return this.http.delete(this.URL + "/" + name,httpOptions)

}
  addImage(name, input, access_token){
  const httpOptions = {
    headers: new HttpHeaders({
      
      'Authorization': access_token
    })
  };
  console.log(access_token)

  return this.http.post(this.URL + "/" + name, input, httpOptions)
}
}