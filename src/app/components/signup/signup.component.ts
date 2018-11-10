import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide=true;
  
  cards=[];
  constructor(private userService:UserService,
              public snackbar:MatSnackBar,
              public router:Router) { }

  ngOnInit() {
   this.userService.getCards().subscribe((response)=>
   {
     console.log(response)
    var data = response["data"];
     for (var i = 0; i < data.data.length;i++){
       data.data[i].select=false;
       this.cards.push(data.data[i])
     }
     console.log("cards",this.cards)
  });  
  }
  service="";
  model: any = {
     "firstName": "",
     "lastName": "",
     "phoneNumber": "" ,
     "service": "",
     "createdDate": new Date(),
     "modifiedDate": new Date(),
     "username":"",
     "email":"" ,
     "emailVerified": true,
     "password": "",
  };
checked=false;
 signup(){
   console.log(this.service.length)
   if (this.model.firstName.length == 0 || this.model.lastName.length == 0 || this.model.email.length == 0 || 
    this.model.password.length == 0 || this.service.length==0  ){
      if(this.service.length===0){
          console.log("fill all the details")
          this.snackbar.open("select a service", "signup failed", {
              duration: 2000
          })
          return;
      }
     console.log("fill all the details")
     this.snackbar.open("fill in all the details", "signup failed", {
       duration: 2000
     })
     return;
   }
   else if(this.model.password!=this.model.cpassword){
     console.log("give same password to confirm");
     this.snackbar.open("should give same password", "signup failed", {
       duration: 2000
     })
        return;
   }
   console.log(this.service.length)
   var RequestBody = {
     "firstName": this.model.firstName,
     "lastName": this.model.lastName,
     "service": this.service,
     "email": this.model.email,
     "emailVerified": true,
     "password": this.model.password,
   }
   this.userService.signupPost(RequestBody).subscribe(response => {
     console.log("signup succesfull")
     this.snackbar.open("signup","sucess",{
          duration:2000
     })
     console.log(response)
     this.router.navigate([''])
   },
     error => {
       console.log("Error", error);
       this.snackbar.open("signup", "failed",{
            duration:2000
       })
     })

  }

 respond(card){
  console.log(card.name);
  this.service=card.name;

  card.select=!card.select;
  if(card.select==false){
    this.service=""
  }
  for(var i=0;i<this.cards.length;i++){
    if(card.name==this.cards[i].name){
      continue;
    }
    this.cards[i].select=false;
  }
 }
}

