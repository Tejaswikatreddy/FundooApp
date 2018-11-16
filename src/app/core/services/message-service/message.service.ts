import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()

export class MessageService {

 public messaging;
 public currentMessage;
  constructor(){
    firebase.initializeApp({
      'messagingSenderId': '263147610417',
    });
    this.messaging = firebase.messaging();
  }
  
 
  getPermission() {    
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log("in");
        localStorage.setItem("pushToken",token)
        console.log(token)
        
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }
}
