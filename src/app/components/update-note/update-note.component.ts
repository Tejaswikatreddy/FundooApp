/** Purpose         : update-note page
 *  @description
 *  @file           : updateNote.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit,Inject } from '@angular/core';
import { NoteService } from '../../core/services/note.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { httpService } from '../../core/services/http.service';
//component decorator
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateNoteComponent>,
                   @Inject(MAT_DIALOG_DATA)public data:any,
                  private NoteService:NoteService,
                  public service:httpService) { }
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
    this.reminder.push(this.data.reminder);
   this.tempArray=[]
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
    console.log(document.getElementById("Updatedtitle").innerHTML)
    this.title = document.getElementById("Updatedtitle").innerHTML;
    this.description = document.getElementById("Updatednote").innerHTML;
    this.id=this.data.id;
      var RequestBody = {
        "noteId": [this.id],
        "title": this.title,
        "description": this.description

      }
      this.NoteService.UpdateNote(this.getFormUrlEncoded(RequestBody)).subscribe(response=>{
      console.log(response);
     
    })
  }
  else{
      if (this.modifiedCheckList != null){
    var apiData={
         "itemName": this.modifiedCheckList.itemName,
         "status":this.modifiedCheckList.status
    }
      this.NoteService.UpdateChecklist(JSON.stringify(apiData), this.data.id, this.modifiedCheckList.id)
     .subscribe(response => {
        console.log(response,"NNNN");
      })
  }
}
    }
    editing(editedList,event){
      
      console.log(editedList);
      if(event.code=="Enter"){
      this.modifiedCheckList=editedList;
      this.updateNotes();
      }
    }
  colorChanged(event){
    this.bgcolor=event; 
  }
  labelAdded(event){
    var flag=false,index;
  for(var i=0;i<this.labels.length;i++){
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
    console.log(checkList);
    this.modifiedCheckList=checkList;
    this.updateNotes();
  }
  public removedList;
  removeList(checklist){
    console.log(checklist)
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    this.NoteService.removeChecklist(null, this.data.id, this.removedList.id)
    .subscribe(response => {
      console.log(response);
      for(var i=0;i<this.tempArray.length;i++){
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
    .subscribe(response => {
      console.log(response);
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      console.log(response['data'].details);
      
      this.tempArray.push(response['data'].details)

      console.log(this.tempArray)

    })
  }
  }
  timeAdded(event){ 
    console.log(event);
    this.reminder.pop();
    this.reminder.push(event)
  }
  }


