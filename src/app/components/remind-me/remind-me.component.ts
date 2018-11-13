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
  public dateForm = new FormControl(new Date())
  public setData;
  public timeArray=[];
 public setTime;

 public minDate=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate())
  ngOnInit() {
        if (this.Note!=undefined && this.Note.isDeleted == true) {
      this.isDeleted = true;
    }
    this.setData=this.dateForm.value;
    this.timeArray=[
      {"value":"Morning","time":"08:00AM"},
      { "value": "AfterNoon", "time": "01:00PM" },
      { "value": "Evening", "time": "06:00PM" },
      { "value": "Night", "time": "08:00PM" },
    ]
    if(this.timeObj.date.getFullYear()==this.date.getFullYear() && 
      this.timeObj.date.getMonth()==this.date.getMonth() &&
      this.timeObj.date.getDate()==this.date.getDate())
      {
        console.log("heyy");
        
      }











  }
  reminderClick(){
    if(this.Note!=undefined && this.Note.reminder.length>0){
    let d = new Date(this.Note.reminder)
    let hrs = d.getHours()
    let mins=d.getMinutes();
    let amPm="AM";
   if (hrs>12){
      hrs=hrs-12;
      amPm="PM"
    }
   if(mins>=0 && mins<=9 || hrs>=0 && hrs<=9){
     if (mins >= 0 && mins <= 9 ){
       this.setTime = hrs + ":" + "0" + mins +" "+amPm
     }
     if (hrs >= 0 && hrs <= 9){
       this.setTime =  "0"+ hrs + ":" + mins +" "+ amPm
     }
     if (mins >= 0 && mins <= 9 && hrs >= 0 && hrs <= 9){
       this.setTime = "0" + hrs + ":"+ "0" + mins +" "+ amPm

     }
    
   }
   else{
     this.setTime = hrs + ":" + mins +" "+amPm

   }
    this.timeObj.time=this.setTime;
    console.log(this.setTime);
    let form = new FormControl(d)
    this.setData = form.value;
    this.timeObj.date=this.setData;
    console.log(d);
  }
  else{
    let d=new Date();
    let form = new FormControl(d)
    this.setData = form.value;
    this.timeObj.date = this.setData;
    let hrs=d.getHours()+3;
    let AmPm="AM"
    if(hrs>12){
      hrs=hrs-12;
      AmPm="PM";
      if(hrs<12){
        this.setTime = "0" + hrs + ":" + "00" + " " + AmPm
      }
      else{
        AmPm="AM"
        this.setTime =  hrs + ":" + "00" + " " + AmPm
      }
      
    }
    else{
        if(hrs==12){
          AmPm="PM"
          this.setTime = hrs + ":" + "00" + " " + AmPm
        }
        else{
          AmPm = "AM"
          this.setTime = "0" + hrs + ":" + "00" + " " + AmPm
        }
    }
      this.timeObj.time = this.setTime;
  }

  }
  public timeObj={
    "date": this.setData,
    "time": ""
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
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 7, 8, 0, 0);
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
    let time = this.timeObj.time.split(' ');
    console.log("time1",time);
    
    let time2=time[0].split(':')
    console.log("2nd",time2);
    
    time2.push(time[1])
    let min=Number(time2[1]);
    let hr=Number(time2[0])
    if(time2[2].toUpperCase()=="PM" && hr<12){
      hr+=12
    }
    let date = new Date(this.timeObj.date.getFullYear(), this.timeObj.date.getMonth(), this.timeObj.date.getDate()+0, hr, min, 0)
  
    
    if (this.Note != undefined) {   
     this.apiData = {
          "reminder": date,
           "noteIdList": [this.Note.id]
     }
       this.addReminder = this.apiData;
       this.adding();
  }

  }
}


