import { Injectable, EventEmitter} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
// import { EventEmitter } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isLabelChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private viewSource = new BehaviorSubject('default message')
  viewList = this.viewSource.asObservable();

  private forViewQ = new BehaviorSubject(true)
  viewFlag = this.forViewQ.asObservable();
   
  private labelName = new BehaviorSubject('default message');
  viewLabel = this.labelName.asObservable()

  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message);
}
  changeView(message:any){

    this.viewSource.next(message)
  }
  

  labeldata(message:string){
    this.labelName.next(message)
  }
  viewDisp(message:any){
    console.log(message);
    this.forViewQ.next(message)
    
  }
}
