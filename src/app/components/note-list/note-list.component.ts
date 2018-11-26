/** Purpose         : Note-list page
 *  @description
 *  @file           : Note-list.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/dataServices/data.service';

import { NoteService } from '../../core/services/NoteService/note.service';
import { AuthService } from "../../core/services/authServices/auth.service"
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { RemindMeComponent} from '../remind-me/remind-me.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CollabComponent } from '../collab/collab.component'
import { MatDialog } from '@angular/material';

/*component decorator*/
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  
})
export class NotelistComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('remindme') remind: RemindMeComponent;
 @Input() NoteArray;
  @Input() searchInput;
  
  public checkArray=[];
  public initial=""
 /*creating an object for EventEmitter*/
 @Output() eventEmit=new EventEmitter();
 public isChecked=false;
 public view;
 public date=new Date();
 public currenttime;
 
  constructor(private auth: AuthService,
    public dialog: MatDialog, private dataService: DataService,private NoteService:NoteService) { }
  ngOnInit() {  
    this.dataService.viewList.subscribe(message => {
      if (message !="default message")
      this.view = message;
    })   
    this.currenttime=this.date.getTime();
  }
  reminderClicked(note){
    this.remind.reminderClick(note.id);
    
  }
  labelClicked(labelName){
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

    const dialogRef = this.dialog.open(UpdateNoteComponent, {
     
           data:note,
        });
    dialogRef.afterClosed().subscribe(result => {

      this.eventEmit.emit({});
   });
  }
  deleteLabel(note,label){
    this.NoteService.removeLabelFromNotes(null, note['id'], label.id)
      .pipe(takeUntil(this.destroy$))

      .subscribe(Response => {
        this.eventEmit.emit({})
      }, error => {
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
    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
  updatelist(id){
    let apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
  
    this.NoteService.UpdateChecklist(JSON.stringify(apiData), id, this.modifiedCheckList.id)
      .pipe(takeUntil(this.destroy$))

    .subscribe(response => {

    })
  }
  reminder(event){
    

    this.eventEmit.emit({})
  }
  deleteReminder(note){
    let id=[];
    id.push(note['id'])
    let RequestBody={
      "noteIdList":id
    }
    this.NoteService.deleteReminder(RequestBody)
      .pipe(takeUntil(this.destroy$))

    .subscribe(response=>{
      this.eventEmit.emit({})
    })
  }
  splice(firstName) {
    this.initial = firstName[0];
    this.initial = this.initial.toUpperCase()
    return true;
  }
  openCollab(note){
    const dialogRef = this.dialog.open(CollabComponent, {
      data:note

    });
    dialogRef.afterClosed().subscribe(result => {

      this.eventEmit.emit({});

    });
  }

  
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }

  

