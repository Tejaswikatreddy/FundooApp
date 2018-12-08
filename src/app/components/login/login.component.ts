/** Purpose         : Login page
 *  @description    : 
 *  @file           : login.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../core/services/UserService/user.service';

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import  'rxjs';
//component designer 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  /*creating an object model*/
  model:any={
    "email": "",
    "password":"",
    "cartId":""
  };
  hide=true;
  id;
  public noCard=false;
  public cards=[];
  public selectedCard;
  constructor(public snackbar: MatSnackBar,
              private loginService:UserService,
               public router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('cartId') == null){
       this.noCard=true;
    }
    if(localStorage.getItem("cartId")!=null){
      this.getCardDetails();
    }
    /*checking if the localStorage has login token*/
  if(localStorage.getItem("id")!=null){
    this.router.navigate(['home'])
    return;
  }
  }
  getCardDetails(){
    this.loginService.getCartDetails(localStorage.getItem('cartId'))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        console.log(response['data'].product.id);
        this.selectedCard = response['data'].product.id;
        this.getCards();

      });
  }  
  getCards(){
    this.loginService.getCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        let data = response["data"];
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].id == this.selectedCard) {
            data.data[i].select = true;
          }
          else {
            data.data[i].select = false;
          }
          this.cards.push(data.data[i])
        }
      }); 

  }
/**
 * @function login() is called when we click the  login button in the html page
 */
  login(){
    if(this.model.email.length==0 || this.model.password.length==0){
      this.snackbar.open("fill in all the details", "login failed", {
        duration: 2000
      })
      return;
    }
    /*calling the api through httpService*/
    let RequestBody = {
      "email": this.model.email,
      "password": this.model.password,
      "cartId": localStorage.getItem("cartId")
    }
    this.loginService.loginPost(RequestBody)
      .pipe(takeUntil(this.destroy$))

    .subscribe(response => {
      this.id = response["id"];
      /*when successfully logged in store the token in the local Storage*/
      localStorage.setItem("id", response['id']);
      localStorage.setItem("firstName", response['firstName']);
      localStorage.setItem("lastName", response['lastName']);
      localStorage.setItem("email", response['email']); 
      localStorage.setItem("imageUrl", response['imageUrl']); 
      localStorage.setItem("userId", response['userId']);
      this.snackbar.open('login', 'success', {
        duration: 2000,
      });
      let pushToken=localStorage.getItem("pushToken")
      
      let ReqBody={
        "pushToken": pushToken
      }
      this.loginService.registerToken(ReqBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response=>{
        
      })
      this.router.navigate(['home']);
    },
      error => {
        this.snackbar.open('login', 'failed', {
          duration: 2000,
        });
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();

   
  }
}
