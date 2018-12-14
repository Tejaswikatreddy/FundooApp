import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/UserService/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService:UserService) { }
public flag2=false;
public flag=false;
public flag3=false;
public cardObj={};
public emptyCart=false;
 public value=25;
 public address;
  public addNotGiven=false;
  public firstCss=true;
  
  public forCss;
  ngOnInit() {
    this.addNotGiven=false;
      if(localStorage.getItem("cartId")!=null){
      this.getCardDetails();
    }
  }
  getCardDetails(){

    this.userService.myCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        
        console.log(response); 
        if (response['data'].length!=0){
          if (response['data'][0].isOrderPlaced==true){
            this.flag2=true;
            this.flag=false;
            this.flag3=true;
            this.forCss = false;
            this.firstCss=false;
            this.value = 100

          }
        this.cardObj = response['data'][0].product;
        console.log(this.cardObj);
        }
        else{
          this.emptyCart=true;
        }
       
      });
  }
 placeOrder(){
   if (localStorage.getItem("cartId")==null){
      console.log("cartId is not present");
      return;
   }
   if(this.address!=undefined){
     let reqBody={
       "cartId":localStorage.getItem("cartId"),
       "address":this.address
     }
     this.userService.placeOrder(reqBody)
       .pipe(takeUntil(this.destroy$))
       .subscribe((response) => {
         console.log(response);
         this.value=100
         this.flag3 = true; this.flag = false;
         this.forCss = false
         
       });
   }
   else{
     console.log("enter address");
     this.addNotGiven=true
     
   }
   
 }
}
