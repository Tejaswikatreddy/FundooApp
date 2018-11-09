import { Component, OnInit } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
model:any={
  "email":"",
}
  constructor(private service : httpService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  send(){
    if(this.model.email.length==0){
      console.log("enter the email id");
      this.snackBar.open("please enter", "email id", {
        duration: 2000
      })
      return;
    }
    this.service.postData("user/reset",{
      "email":this.model.email,
     }).subscribe(response=>{
      console.log(response)
      this.snackBar.open("reset link","sent",{
        duration:2000
      })
    },error=>{
      console.log(error);
      this.snackBar.open("sorry", "reset failed", {
        duration: 2000
      })
    })
  }
}
