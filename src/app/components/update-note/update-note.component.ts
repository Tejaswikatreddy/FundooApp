/** Purpose         : update-note page
 *  @description
 *  @file           : updateNote.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//component decorator
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogRef: MatDialogRef<UpdateNoteComponent>,
                   @Inject(MAT_DIALOG_DATA)public data:any,
                  private NoteService:NoteService,
                  ) { }
public title;
public description;
public id;
public bgcolor=this.data.color;
  public labels = [];
  public checklist=false;
  public modifiedCheckList;
  public newList;
  public tempArray=[]
  public newData:any={}
public arrayObj:any={}
public reminder=[];
  ngOnInit() {
   if(this.data.reminder.length>0){
     this.reminder=this.data.reminder;
   }
    this.labels=this.data.noteLabels;
    if (this.data.noteCheckLists.length>0){
      this.checklist=true;
    }
    this.tempArray=this.data.noteCheckLists;
}
  /**
   * @function onClose() invoked when the close button on the popup is clicked
   */
  onClose(): void {
    this.dialogRef.close();
    
    this.updateNotes();

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
 
  updateNotes(){
    if(this.checklist==false){
    this.title = document.getElementById("Updatedtitle").innerHTML;
    this.description = document.getElementById("Updatednote").innerHTML;
    this.id=this.data.id;
      let RequestBody = {
        "noteId": [this.id],
        "title": this.title,
        "description": this.description

      }
      this.NoteService.UpdateNote(this.getFormUrlEncoded(RequestBody))
        .pipe(takeUntil(this.destroy$))

      .subscribe(response=>{
     
    })
  }
  else{
      if (this.modifiedCheckList != null){
    let apiData={
         "itemName": this.modifiedCheckList.itemName,
         "status":this.modifiedCheckList.status
    }
      this.NoteService.UpdateChecklist(JSON.stringify(apiData), this.data.id, this.modifiedCheckList.id)
        .pipe(takeUntil(this.destroy$))

     .subscribe(response => {
      })
  }
}
    }
    editing(editedList,event){
      
      if(event.code=="Enter"){
      this.modifiedCheckList=editedList;
      this.updateNotes();
      }
    }
  colorChanged(event){
    this.bgcolor=event; 
  }
  labelAdded(event){
    let flag=false,index;
  for(let i=0;i<this.labels.length;i++){
    if(event.id==this.labels[i].id){
      flag=true;
      index=i;
    }
  }
  if(flag==true){
    this.labels.splice(index,1)
  }
  else{
    this.labels.push(event)
  }
   
  }
  checkBox(checkList){
    
    if (checkList.status=="open"){
      checkList.status = "close"
    }
    else{
      checkList.status = "open"
    }
    this.modifiedCheckList=checkList;
    this.updateNotes();
  }
  public removedList;
  removeList(checklist){
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    this.NoteService.removeChecklist(null, this.data.id, this.removedList.id)
      .pipe(takeUntil(this.destroy$))

    .subscribe(response => {
      for(let i=0;i<this.tempArray.length;i++){
        if(this.tempArray[i].id==this.removedList.id){
          this.tempArray.splice(i,1)
        }
      }
    })
  }
 
  public adding=false;
  public addCheck=false;
  public status="open"
  addList(event){
    if(this.newList!=""){
      this.adding = true;
    }
   else{
      this.adding = false;
   }
    if (event.code == "Enter") {
      if(this.addCheck==true){
        this.status="close";
      }
      else{
        this.status="open"
      }
      this.newData={
        "itemName":this.newList,
        "status":this.status
      }
    this.NoteService.addChecklist(this.newData,this.data.id)
      .pipe(takeUntil(this.destroy$))

    .subscribe(response => {
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      this.tempArray.push(response['data'].details)

    })
  }
  }
  timeAdded(event){ 
    if(this.reminder.length>0)
    this.reminder=[];
    this.reminder.push(event)
  }
  deleteLabel(label) {
    let index;
    this.NoteService.removeLabelFromNotes(null, this.data['id'], label.id)
      .pipe(takeUntil(this.destroy$))

      .subscribe(Response => {
        for (let i = 0; i < this.labels.length; i++) {
          if (label.id == this.labels[i].id) {
              index = i;
              break;
          }
        }
        this.labels.splice(index,1)
       
      }, error => {
      })

  }
  deleteReminder() {
    let id = [];
    id.push(this.data['id'])
    let RequestBody = {
      "noteIdList": id
    }
    this.NoteService.deleteReminder(RequestBody)
      .pipe(takeUntil(this.destroy$))

    .subscribe(response => {
    this.reminder=[];

     })
  }
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }


