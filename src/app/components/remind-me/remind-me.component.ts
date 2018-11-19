import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/note.service'
import { DataService } from '../../core/services/data.service';
import { Subscription } from "rxjs";

import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material';
@Component({
  selector: 'app-remind-me',
  templateUrl: './remind-me.component.html',
  styleUrls: ['./remind-me.component.scss'],
  exportAs: 'menuInOtherComponent',
})
export class RemindMeComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  @Input() Note;
  public isDeleted = false;
  @Output() eventEmit = new EventEmitter();
  @Output() eventEmit1 = new EventEmitter();

  constructor(public service: NoteService, public dataService: DataService) { }
  public date = new Date();
  public apiData = {};
  public id = [];
  public dateTime = false;
  public addReminder = {};
  public dateForm = new FormControl(new Date())
  public setData;
  public timeArray = [
    { "value": "Morning", "time": "08:00 AM", "disable": false },
    { "value": "AfterNoon", "time": "01:00 PM", "disable": false },
    { "value": "Evening", "time": "06:00 PM", "disable": false },
    { "value": "Night", "time": "08:00 PM", "disable": false },
  ];
  public setTime;
  public save = false;
  public inputfield = true;
  sub: Subscription;
private inputArray=[];
  public minDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate())
  ngOnInit() {
   
    if (this.Note != undefined && this.Note.isDeleted == true) {
      this.isDeleted = true;
    }
    if(this.Note!=undefined){
      this.inputArray.push(this.Note.id)
    }
    this.setData = this.dateForm.value;
    
  }
  reminderClick(id) {
   console.log(this.inputArray);
   
console.log("reminder clicked");


    if (this.Note != undefined && id == this.Note.id) {
      this.trigger.openMenu();
    }

    if (this.Note != undefined && this.Note.reminder != undefined) {
      this.dateTime = true;
    }
    if (this.Note != undefined && this.Note.reminder.length == 0) {
      this.dateTime = false;
    }
    if (this.Note != undefined && this.Note.reminder.length > 0) {
      let d = new Date(this.Note.reminder)
      let hrs = d.getHours()
      let mins = d.getMinutes();
      let amPm = "AM";
      if (hrs > 12) {
        hrs = hrs - 12;
        amPm = "PM"
      }
      if (mins >= 0 && mins <= 9 || hrs >= 0 && hrs <= 9) {
        if (mins >= 0 && mins <= 9) {
          this.setTime = hrs + ":" + "0" + mins + " " + amPm
        }
        if (hrs >= 0 && hrs <= 9) {
          this.setTime = "0" + hrs + ":" + mins + " " + amPm
        }
        if (mins >= 0 && mins <= 9 && hrs >= 0 && hrs <= 9) {
          this.setTime = "0" + hrs + ":" + "0" + mins + " " + amPm

        }

      }
      else {
        this.setTime = hrs + ":" + mins + " " + amPm

      }
      this.timeObj.time = this.setTime;
      // console.log(this.setTime);
      let form = new FormControl(d)
      this.setData = form.value;
      this.timeObj.date = this.setData;
      // console.log(d);
    }
    else  {
      let d = new Date();
      let form = new FormControl(d)
      this.setData = form.value;
      this.timeObj.date = this.setData;
      let hrs = d.getHours() + 3;
      let AmPm = "AM"
      if (hrs > 12) {
        hrs = hrs - 12;
        AmPm = "PM";
        if (hrs < 12) {
          this.setTime = "0" + hrs + ":" + "00" + " " + AmPm
        }
        else {
          AmPm = "AM"
          this.setTime = hrs + ":" + "00" + " " + AmPm
        }

      }
      else {
        if (hrs == 12) {
          AmPm = "PM"
          this.setTime = hrs + ":" + "00" + " " + AmPm
        }
        else {
          AmPm = "AM"
          this.setTime = "0" + hrs + ":" + "00" + " " + AmPm
        }
      }
      this.timeObj.time = this.setTime;
    }
   
    this.disabler()
  }

  public timeObj = {
    "date": this.setData,
    "time": ""
  }
  today() {
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 0, 20, 0, 0);
    this.eventEmit.emit(date);
    if (this.Note != null) {
      this.id.push(this.Note.id);
      this.apiData = {
        "reminder": date,
        "noteIdList": this.id
      }
      this.addReminder = this.apiData;
      this.adding()
    }
  }
  tomorrow() {
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1, 8, 0, 0);
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
  nextWeek() {
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
  adding() {
   
    
   
    if (new Date(this.addReminder['reminder']).getTime() < new Date().getTime() ){
      
      return;
    }
    this.service.addReminder(this.addReminder).subscribe(response => {
      this.eventEmit1.emit({})
      this.eventEmit.emit(this.addReminder['reminder']);

    })
  }

  saveTime() {
    let time = this.timeObj.time.split(' ');
    let time2 = time[0].split(':')
    time2.push(time[1])
    let min = Number(time2[1]);
    let hr = Number(time2[0])
    if (time2[2] == "PM" && hr < 12) {
      hr += 12
    }
    let date = new Date(this.timeObj.date.getFullYear(), this.timeObj.date.getMonth(), this.timeObj.date.getDate() + 0, hr, min, 0)
    this.eventEmit.emit(date)

    if (this.Note != undefined) {
      this.apiData = {
        "reminder": date,
        "noteIdList": [this.Note.id]
      }
      this.addReminder = this.apiData;
      this.adding();
    }

  }
  dateChanged() {
   
    this.timeArray[0].disable = 
    this.timeArray[1].disable = 
    this.timeArray[2].disable = 
    this.timeArray[3].disable = false;
    this.disabler();
  }
  disabler() {
    if (this.timeObj.date.getFullYear() == this.date.getFullYear() &&
      this.timeObj.date.getMonth() == this.date.getMonth() &&
      this.timeObj.date.getDate() == this.date.getDate()) {
      var month = this.date.getMonth();
      var year = this.date.getFullYear();
      var date = this.date.getDate();
      if (this.date.getTime() > new Date(year, month, date + 0, 8, 0, 0).getTime()) {
        this.timeArray[0].disable = true;
      }
      if (this.date.getTime() > new Date(year, month, date + 0, 13, 0, 0).getTime()) {
        this.timeArray[1].disable = true;
      }
      if (this.date.getTime() > new Date(year, month, date + 0, 18, 0, 0).getTime()) {
        this.timeArray[2].disable = true;
      }
      if (this.date.getTime() > new Date(year, month, date + 0, 20, 0, 0).getTime()) {
        this.timeArray[3].disable = true;
      }
    }
    if (this.timeObj.date.getFullYear() < this.date.getFullYear() ||
      this.timeObj.date.getMonth() < this.date.getMonth() ||
      this.timeObj.date.getDate() < this.date.getDate()) {
      this.timeArray[0].disable = 
      this.timeArray[1].disable = 
      this.timeArray[2].disable = 
      this.timeArray[3].disable = true;


    }
    if (this.timeObj.date.getFullYear() > this.date.getFullYear() ||
      this.timeObj.date.getMonth() > this.date.getMonth() ||
      this.timeObj.date.getDate() > this.date.getDate()) {
      this.timeArray[0].disable =
        this.timeArray[1].disable =
        this.timeArray[2].disable =
        this.timeArray[3].disable = false;

    }
  }
  regexValidate() {
    console.log("validate function");

    let regex = /^(2[0-3]|1?[0-9]|0?[1-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am)$/;
    if (!regex.test(this.timeObj.time)) {
      this.save = true;
    }
    else {
      this.save = false;
    }
  }

}


