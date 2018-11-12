import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {NoteService} from '../../core/services/note.service'
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-remind-me',
  templateUrl: './remind-me.component.html',
  styleUrls: ['./remind-me.component.scss']
})
export class RemindMeComponent implements OnInit {
@Input()  Note;
  public isDeleted = false;
  @Output() eventEmit=new EventEmitter();
  constructor(public service: NoteService) { }
  public date=new Date();
  public apiData={};
  public id=[];
  public dateTime=false;
  public addReminder={};
  public dateForm=new FormControl(new Date())
  public setData;
  public timeArray=[];
 public setTime;
 public minDate=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate())
  ngOnInit() {
    if (this.Note!=undefined && this.Note.isDeleted == true) {
      this.isDeleted = true;
    }
    console.log(this.Note);
    this.setData=this.dateForm.value;
    console.log(this.setData);
    
    this.timeArray=[
      {"value":"Morning","time":"08:00am"},
      { "value": "AfterNoon", "time": "01:00pm" },
      { "value": "Evening", "time": "06:00pm" },
      { "value": "Night", "time": "08:00pm" },
    ]
  }
  public timeObj={
    "date": this.setData,
    "time":""
  }
  today(){
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 0, 20, 0, 0);
    this.eventEmit.emit(date);
   if(this.Note!=null){
    this.id.push(this.Note.id);
      this.apiData={
      "reminder":date,
      "noteIdList":this.id
    }
    this.addReminder=this.apiData;
     this.adding()
  }
  }
  tomorrow(){
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1, 8, 0, 0);
    this.eventEmit.emit( date );

    if (this.Note != null) {
    this.id.push(this.Note.id);
    this.apiData = {
      "reminder": date,
      "noteIdList": this.id
    }
    this.addReminder = this.apiData;
    this.adding();
  }
  }
  nextWeek(){
    var date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7, 8, 0, 0);
    this.eventEmit.emit(date);
    if (this.Note != null) {
    this.id.push(this.Note.id);
    this.apiData = {
      "reminder": date,
      "noteIdList": this.id
    }
    this.addReminder = this.apiData;
    this.adding();
  }

  }
  adding(){
    this.service.addReminder(this.addReminder).subscribe(response=>{
      console.log(response);   
      this.eventEmit.emit({})
      this.eventEmit.emit(this.addReminder['reminder']);
      console.log("emitting event");

    })
  }
 
  saveTime(){
    console.log(this.timeObj.date)
    console.log(this.timeObj.time.length)
    var time = this.timeObj.time
    var ampm=time.substr(5,7)
    var hrs=time.substr(0,2)
    var mins=time.substring(3,5)
     var flag=0;
    if(ampm=="pm"){
      flag=12;
    }
    var h=+hrs;
    var m=+mins;
    var date = new Date(this.timeObj.date.getFullYear(), this.timeObj.date.getMonth(), this.timeObj.date.getDate(),h+flag,m,0)
    this.apiData={
      "reminder":date,
      "noteIdList":[this.Note.id]
    }
    this.addReminder=this.apiData;
    this.adding();
  }

}
