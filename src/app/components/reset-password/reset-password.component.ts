import { Component, OnInit } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { UserService } from '../../core/services/user.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {
     "password": ""
  };
  hide=true;
  
  constructor(private service:httpService,
              public route:ActivatedRoute,public userservice:UserService) { }
    public accessToken=this.route.snapshot.params.forgotToken;
  ngOnInit() {
  }
  public input = new FormData();
// Add your values in here
  set(){
    console.log(this.model.password.length);
    
    var body={
      "newPassword": this.model.password
    }
    if(this.model.password.length==0){
      console.log("please enter the password");
      return;
    }
  
    this.userservice.setPassword(this.getFormUrlEncoded(body),this.accessToken)
   .subscribe(response=>{
      console.log("successfull",response);
  
    })
    console.log("accessToken",this.accessToken)
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
}
