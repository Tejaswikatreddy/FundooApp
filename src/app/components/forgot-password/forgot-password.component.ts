import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../core/services/UserService/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

model:any={
  "email":"",
}
  constructor(
    public snackBar: MatSnackBar, private UserService: UserService,private router:Router) { }

  ngOnInit() {
  }
  send(){
    if(this.model.email.length==0){
      this.snackBar.open("please enter", "email id", {
        duration: 2000
      })
      return;
    }
    let RequestBody={
      "email": this.model.email,

    }
    this.UserService.resetPassword(RequestBody)
      .pipe(takeUntil(this.destroy$))
   .subscribe(response=>{
      this.snackBar.open("reset link","sent",{
        duration:2000
      })
      this.router.navigate(['login'])
    },error=>{
      this.snackBar.open("sorry", "reset failed", {
        duration: 2000
      })
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
