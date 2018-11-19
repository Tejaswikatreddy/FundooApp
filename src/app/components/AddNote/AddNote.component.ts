/** Purpose         : AddNote page
 *  @description
 *  @file           : addNote.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit, EventEmitter, Output, Input, ElementRef, ViewChild} from '@angular/core';
import { NoteService } from '../../core/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './AddNote.component.html',
  styleUrls: ['./AddNote.component.scss'],
 
})

export class AddNoteComponent implements OnInit {
public title;
public note;
public changedColor="#ffffff"
  @Input() reminderComponent;

  @Output() onNewEntryAdded = new EventEmitter();
 
//creating an object for eventEmitter
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
  matClick(){
    if(this.reminderComponent==true){
      this.reminder.push(this.d.getTime())
      console.log(this.reminder);
      
    }

  }
  
  public isPinned = false;
  public isArchived=false;
  public body:any={}
  public check=false;
  addNotes(){
   
    var apiColor=this.changedColor;
    this.changedColor = "#ffffff"
    this.title = document.getElementById("title").innerHTML;
    this.clicked = !this.clicked;

    //binding values from the html page
    if(this.check==false){
    this.note=document.getElementById("note").innerHTML;
    //calling the api to add the Note through services
   
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
        console.log("else part");
        
 for(var i=0;i<this.dataArray.length;i++){
   if(this.dataArray[i].isChecked==true){
    this.status="close"
   }
   var apiObj={
     "itemName":this.dataArray[i].data,
     "status":this.status
   }
   this.dataArrayApi.push(apiObj)
   this.status="open"
 }
//  console.log(this.dataArrayApi);
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
  this.NoteService.NewNote(this.getFormUrlEncoded(this.body)).subscribe(response=>{
   
      this.labelId = []
      this.labelName=[];
      this.dataArray=[];
      this.dataArrayApi=[];
      this.adding=false
      //emitting an event when the note is added
      this.onNewEntryAdded.emit({})         
    },error=>{
      console.log(error);
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
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
   pinEvent(event){
      this.isPinned=true;
   }
  colorChanged(event){
    this.changedColor=event;
  }
  public labelName=[];
  labelEvent(event){
    if(this.labelName.indexOf(event)<0){
      this.labelId.push(event.id);
      this.labelName.push(event)
    }
    else{
      this.labelName.splice(this.labelName.indexOf(event),1);
      this.labelId.splice(this.labelId.indexOf(event), 1);
    }
    console.log("add component label",event)
  }
  public data;
  public i=0;
  public adding=false;
  public addCheck=false;
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
    console.log(event,"keydown");
    var obj={
      "index":this.i,
      "data":this.data,
      "isChecked":this.isChecked
    }
    this.dataArray.push(obj)
    console.log(this.dataArray);
    this.data=null;
    this.adding=false;
    this.isChecked=false;
      this.addCheck = false;
     }
  }
  onDelete(deletedObj){
    console.log("onDelete function");
       for(var i=0;i<this.dataArray.length;i++){
          if(deletedObj.index==this.dataArray[i].index){
            this.dataArray.splice(i,1);
            break;
       }
        
      }
    console.log(this.dataArray)
  }
 
  deleteLabel(label){
    this.labelName.splice(this.labelName.indexOf(label), 1);
    this.labelId.splice(this.labelId.indexOf(label), 1);
  }
  archiveEvent(event){
    this.isArchived=true;
  }
  checklist($event){
    this.check=true;
  }
  public reminder=[];
  reminderAdded(event){
    if (this.reminder.length >= 1) {
      this.reminder.pop();
    }
    this.reminder.push(event);
   
  }
  deleteReminder(){
    this.reminder=[];
  }
  public todayDate
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
  }


