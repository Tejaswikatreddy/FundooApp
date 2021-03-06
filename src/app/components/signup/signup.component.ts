import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/services/UserService/user.service';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  hide=true;
  
  cards=[];
  constructor(private userService:UserService,
              public snackbar:MatSnackBar,
              public router:Router) { }

  ngOnInit() {
   this.userService.getCards()
     .pipe(takeUntil(this.destroy$))
   .subscribe((response)=>
   {
    let data = response["data"];
     for (let i = 0; i < data.data.length;i++){
       data.data[i].select=false;
       this.cards.push(data.data[i])
     }
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
   if (this.model.firstName.length == 0 || this.model.lastName.length == 0 || this.model.email.length == 0 || 
    this.model.password.length == 0 || this.service.length==0  ){
      if(this.service.length===0){
          this.snackbar.open("select a service", "signup failed", {
              duration: 2000
          })
          return;
      }
     this.snackbar.open("fill in all the details", "signup failed", {
       duration: 2000
     })
     return;
   }
   else if(this.model.password!=this.model.cpassword){
     this.snackbar.open("should give same password", "signup failed", {
       duration: 2000
     })
        return;
   }
   let RequestBody = {
     "firstName": this.model.firstName,
     "lastName": this.model.lastName,
     "service": this.service,
     "email": this.model.email,
     "emailVerified": true,
     "password": this.model.password,
   }
   this.userService.signupPost(RequestBody)
     .pipe(takeUntil(this.destroy$))
   .subscribe(response => {
     this.snackbar.open("signup","sucess",{
          duration:2000
     })
     this.router.navigate([''])
   },
     error => {
       this.snackbar.open("signup", "failed",{
            duration:2000
       })
     })

  }

 respond(card){
  this.service=card.name;

  card.select=!card.select;
  if(card.select==false){
    this.service=""
  }
  for(let i=0;i<this.cards.length;i++){
    if(card.name==this.cards[i].name){
      continue;
    }
    this.cards[i].select=false;
  }
 
}
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

