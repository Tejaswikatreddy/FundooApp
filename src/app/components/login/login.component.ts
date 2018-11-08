/** Purpose         : Login page
 *  @description
 *  @file           : login.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit } from '@angular/core';
import { httpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"
//component designer 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //creating an object model
  model:any={
    "email": "",
    "password":""
  };
  hide=true;
  id;
  constructor(private _signupService: httpService,
    public snackbar: MatSnackBar,
    public router: Router, private auth: AuthService) { }

  ngOnInit() {
    //checking if the localStorage has login token
  if(localStorage.getItem("id")!=null){
    this.router.navigate(['home'])
    return;
  }
  }
/**
 * @function login() is called when we click the  login button in the html page
 */
  login(){
    if(this.model.email.length==0 || this.model.password.length==0){
      console.log("fill all the details")
      this.snackbar.open("fill in all the details", "signup failed", {
        duration: 2000
      })
      return;
    }
    //calling the api through httpService
    this._signupService.postData("user/login", {
      "email": this.model.email,
      "password": this.model.password
    }).subscribe(response => {
      console.log("login succesfull")
      console.log(response)
      this.id = response["id"];
      //when successfully logged in store the token in the local Storage
      this.auth.setToken(this.id );
      localStorage.setItem("firstName", response['firstName']);
      localStorage.setItem("lastName", response['lastName']);
      localStorage.setItem("email", response['email']); 
      localStorage.setItem("imageUrl", response['imageUrl']); 

      console.log("in");
      
      localStorage.setItem("userId", response['userId']);
      console.log("out");
      
      this.snackbar.open('login', 'success', {
        duration: 2000,
      });
      this.router.navigate(['home'])
    },
      error => {
        console.log("Error", error);
        this.snackbar.open('login', 'failed', {
          duration: 2000,
        });
      })
  }
}
