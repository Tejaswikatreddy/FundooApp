import { Component, OnInit } from '@angular/core';
import { httpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {
     "password": ""
  };
  hide=true;
  
  constructor(private service:httpService,
              public route:ActivatedRoute) { }
    public accessToken=this.route.snapshot.params.forgotToken;
  ngOnInit() {
  }
  public input = new FormData();
// Add your values in here
  set(){
    var body={
      "newPassword": this.model.password
    }
    if(this.model.password.length==0){
      console.log("please enter the password");
      return;
    }
    this.input.append('newPassword', this.model.password);
    console.log(this.input)
    this.service.post("user/reset-password",body,this.accessToken).subscribe(response=>{
      console.log("successfull",response);
    },error=>{
      console.log("failed",error)
    })
    console.log("accessToken",this.accessToken)
  }

}
