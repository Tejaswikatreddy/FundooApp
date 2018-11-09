import { Injectable, EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { EventEmitter } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isLabelChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: string) {
    console.log("data Service changeMessage method",message);
    
    this.messageSource.next(message);
   
  }
 
}
