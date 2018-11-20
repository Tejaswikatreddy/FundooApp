/** Purpose         : AddNote page
 *  @description
 *  @file           : addNote.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit, EventEmitter, Output, Input, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-note',
  templateUrl: './AddNote.component.html',
  styleUrls: ['./AddNote.component.scss'],
 
})

export class AddNoteComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

public title;
public note;
public changedColor="#ffffff"
  @Input() reminderComponent;

  /*creating an object for eventEmitter*/
  @Output() onNewEntryAdded = new EventEmitter();
 
  constructor(private NoteService:NoteService) { }
  @ViewChild('editDiv') public editDiv: ElementRef;

public clicked=false;
public labelId=[];
public checkList=[];
public dataArray=[];
public dataArrayApi=[];
public isChecked=false;
public status="open"
public d=new Date()
  ngOnInit() {
  }
  /**
   * @function matClick() is called when we click on the initial mat-card
   */
  matClick(){
    /*it checks if the mat-card is in reminder component */
    if(this.reminderComponent==true){
      this.reminder.push(this.d.getTime())
    }
  }
  
  public isPinned = false;
  public isArchived=false;
  public body:any={}
  public check=false;
  /**
   * @function addNotes() method is called when we click close button on the mat-card
   */
  addNotes(){
   
    let apiColor=this.changedColor;
    this.changedColor = "#ffffff"
    this.title = document.getElementById("title").innerHTML;
    this.clicked = !this.clicked;

    /*binding values from the html page*/
    if(this.check==false){
    this.note=document.getElementById("note").innerHTML;
    /*calling the api to add the Note through services*/
   
           this.body={
          "title": this.title,
          "description": this.note,
          "isPined": this.isPinned,
          "color": apiColor,
          "isArchived": this.isArchived,
          "labelIdList": JSON.stringify(this.labelId),
             "reminder": this.reminder

        }
    
    }
      else{
        
 for(let i=0;i<this.dataArray.length;i++){
   if(this.dataArray[i].isChecked==true){
    this.status="close"
   }
   let apiObj={
     "itemName":this.dataArray[i].data,
     "status":this.status
   }
   this.dataArrayApi.push(apiObj)
   this.status="open"
 }
       this.body={
         "title": this.title,
         "checklist":JSON.stringify(this.dataArrayApi),
         "isPined": this.isPinned,
         "color": apiColor,
         "isArchived": this.isArchived,
         "labelIdList": JSON.stringify(this.labelId),
         "reminder":this.reminder
        }
 }
if (this.title != "") {
  this.NoteService.NewNote(this.getFormUrlEncoded(this.body))
  .pipe(takeUntil(this.destroy$))
  .subscribe(response=>{
      /*reinitializing all the arrays after the response from the api */
      this.labelId = []
      this.labelName=[];
      this.dataArray=[];
      this.dataArrayApi=[];
      this.adding=false
      /*emitting an event when the note is added*/
      this.onNewEntryAdded.emit({})         
    },error=>{
      this.labelId = []
      this.labelName = [];
      this.dataArray=[];
      this.dataArrayApi=[];
      this.adding = false
    })
      
  }
  if(this.reminderComponent==false)
    this.reminder = [];
    if(this.reminderComponent==true){
    
      this.reminder[0]=this.d.getTime()
    }
    this.labelId = []
      this.labelName = [];
      this.dataArray=[];
      this.dataArrayApi=[];
      this.adding = false;
      this.data="";
        this.reminder = [];
  }
  /**
   * @function getFormUrlEncoded() to encode the data to be posted in the database
   */
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  /**
   * @function pinEvent() the function is called when the event is triggered from the pin component
   */
   pinEvent(event){
      this.isPinned=true;
   }
   /**
    * @function colorChanged() when the event is triggered from the change-color component
    */
  colorChanged(event){
    this.changedColor=event;
  }
  public labelName=[];
  /**@function labelEvent() is called when the event is triggered from the more-component when the label is added */
  labelEvent(event){
    if(this.labelName.indexOf(event)<0){
      this.labelId.push(event.id);
      this.labelName.push(event)
    }
    else{
      this.labelName.splice(this.labelName.indexOf(event),1);
      this.labelId.splice(this.labelId.indexOf(event), 1);
    }
  }
  public data;
  public i=0;
  public adding=false;
  public addCheck=false;
  /**
   * @function onEnter() is called when we press enter on a checklist item
   */
  onEnter(event){
    if (this.data != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
   this.i++;
   this.isChecked=this.addCheck
    if (this.data != null && event.code == "Enter"){
    let obj={
      "index":this.i,
      "data":this.data,
      "isChecked":this.isChecked
    }
    this.dataArray.push(obj)
    this.data=null;
    this.adding=false;
    this.isChecked=false;
      this.addCheck = false;
     }
  }
  /**
   * @function onDelete() is called when we click cancel button of the checklist item
   */
  onDelete(deletedObj){
       for(let i=0;i<this.dataArray.length;i++){
          if(deletedObj.index==this.dataArray[i].index){
            this.dataArray.splice(i,1);
            break;
       }
        
      }
  }
 /**
  * @function deleteLabel() is called when we click the cancel button of the label mat-chip
  */
  deleteLabel(label){
    this.labelName.splice(this.labelName.indexOf(label), 1);
    this.labelId.splice(this.labelId.indexOf(label), 1);
  }
  /**
   * @function archiveEvent() is called when an event is triggered from the archive component when the archive buttonis clicked
   */
  archiveEvent(event){
    this.isArchived=true;
  }
  /**
   * @function checklist() is called when the event is triggered from the more component to hide and show checklist mat-card
   */
  checklist($event){
    this.check=true;
  }
  public reminder=[];
  /**
   * @function reminderAdded() is called when the event is triggered from the reminder component
   */
  reminderAdded(event){
    /* if there is a reminder present in the array already delete it and push the new reminder*/
    if (this.reminder.length >= 1) {
      this.reminder.pop();
    }
    this.reminder.push(event);
   
  }
  /**
   * @function deleteReminder() is called when we click the cancel button of reminder mat-chip
   */
  deleteReminder(){
    this.reminder=[];
  }
  public todayDate
  /**
   * @function checkreminder() is called when printing the reminders in mat-chip
   */
  checkreminder(noteTime) {
    let hrs=new Date(noteTime).getHours();
    let mins=new Date(noteTime).getMinutes();
      let amPm="AM"
   
 
    if (new Date(noteTime).getDate() == new Date().getDate()) {
      if(new Date(noteTime).getHours()==new Date().getHours()){
      hrs=hrs+4;
      
      }
      if(hrs>12){
      hrs = hrs - 12;
      amPm="PM"

    }
        if(mins<10){
         this.todayDate = "Today,"+"0" + hrs + ":"+"0" + mins+":00"+amPm
         return 3;
      }
           this.todayDate = "Today," + "0" + hrs + ":" + mins +":00"+ amPm
      return 3;
    }
    else if (new Date(noteTime).getDate() == new Date().getDate() + 1) {
       if(hrs>12){
      hrs = hrs - 12;
      amPm="PM"

    }
      if (mins < 10) {
             this.todayDate = "Tomorrow," + "0" + hrs + ":" + "0" + mins + ":00" + amPm
             return 3;
           }
           this.todayDate = "Tommorow," + "0" + hrs + ":" + mins + ":00" + amPm

           return 3;
    }

    else {
      return 2;

    }
  }
  checklistMore(event){
    this.check=event;
  }
  ngOnDestroy() {
    console.log("ondestroy called");
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }


