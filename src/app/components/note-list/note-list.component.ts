/** Purpose         : Note-list page
 *  @description
 *  @file           : Note-list.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { DataService } from '../../core/services/data.service';

import { NoteService } from '../../core/services/note.service';
import { AuthService } from "../../core/services/auth.service"
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { RemindMeComponent} from '../remind-me/remind-me.component'
/*component decorator*/
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  
})
export class NotelistComponent implements OnInit {
  @ViewChild('remindme') remind: RemindMeComponent;
 @Input() NoteArray;
  @Input() searchInput;
  
  public checkArray=[];
 /*creating an object for EventEmitter*/
 @Output() eventEmit=new EventEmitter();
 public isChecked=false;
 public view;
 public date=new Date();
 public currenttime;
 
  constructor(private auth: AuthService, public service: httpService,
    public dialog: MatDialog, private dataService: DataService,private NoteService:NoteService) { }
  ngOnInit() {  
    this.dataService.viewList.subscribe(message => {
      if (message !="default message")
      this.view = message;
    })   
    this.currenttime=this.date.getTime();
  }
  reminderClicked(note){
    console.log("reminder cllicked");
    this.remind.reminderClick(note.id);
    // this.dataService.previous1Date(note.id)
  }
  labelClicked(labelName){
    console.log(labelName);
    this.dataService.labeldata(labelName)
  }
  public todayDate;
  checkreminder(noteTime){    
    let hrs=new Date(noteTime).getHours();
    let mins=new Date(noteTime).getMinutes();
    let amPm="AM"
    if(hrs>12){
      hrs = hrs - 12;
      amPm="PM"

    }
         if(new Date(noteTime).getTime()<new Date().getTime()){
      return 1;
      } 
    else if (new Date(noteTime).getDate() == new Date().getDate()){
      if(mins<10){
         this.todayDate = "Today,"+"0" + hrs + ":"+"0" + mins+":00"+amPm
         return 3;
      }
           this.todayDate = "Today," + "0" + hrs + ":" + mins +":00"+ amPm

      return 3;
    }
      else if (new Date(noteTime).getDate() == new Date().getDate()+1) {

           if (mins < 10) {
             this.todayDate = "Tomorrow," + "0" + hrs + ":" + "0" + mins + ":00" + amPm
             return 3;
           }
           this.todayDate = "Tommorow," + "0" + hrs + ":" + mins + ":00" + amPm

           return 3;
      }
      else if (new Date(noteTime).getDate() == new Date().getDate()-1) {

           if (mins < 10) {
             this.todayDate = "Yesterday," + "0" + hrs + ":" + "0" + mins + ":00" + amPm
             return 4;
           }
           this.todayDate = "Yesterday," + "0" + hrs + ":" + mins + ":00" + amPm

           return 4;
      }
      
    else{
        return 2;

    }
    }
/**
 * @function eventDone() invoked when there is an event in the child component
 */
 eventDone(event){
   console.log("deleted in note list",event)
   if(event){
     this.eventEmit.emit({});
     /*event emitted to the parent component*/
   }
  
 }
 /**
  * @function openDialog() opens a popup when clicked on the notes
  * @param note is the object with the details of the note on which it is clicked
  */
  open(note): void {
    console.log(note.color)

    const dialogRef = this.dialog.open(UpdateNoteComponent, {
     
           data:note,
        });
console.log(note);
    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      this.eventEmit.emit({});
   });
  }
  deleteLabel(note,label){
    this.NoteService.removeLabelFromNotes(null, note['id'], label.id)
      .subscribe(Response => {
        console.log(Response);
        this.eventEmit.emit({})
      }, error => {
        console.log(error)
      })
  
  }
  public modifiedCheckList
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
  updatelist(id){
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
  
    this.NoteService.UpdateChecklist(JSON.stringify(apiData), id, this.modifiedCheckList.id)
    .subscribe(response => {
      console.log(response);

    })
  }
  reminder(event){
    
    console.log("notelist",event);

    this.eventEmit.emit({})
  }
  deleteReminder(note){
    let id=[];
    id.push(note['id'])
    let RequestBody={
      "noteIdList":id
    }
    this.NoteService.deleteReminder(RequestBody).subscribe(response=>{
      console.log(response);
      this.eventEmit.emit({})
      
    })
  }
  }

  

