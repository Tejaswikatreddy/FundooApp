/** Purpose         : update-note page
 *  @description
 *  @file           : updateNote.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { environment } from '../../../environments/environment'
import { UserService } from '../../core/services/UserService/user.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//component decorator
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss'],
})
export class UpdateNoteComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dialogRef: MatDialogRef<UpdateNoteComponent>,
                   @Inject(MAT_DIALOG_DATA)private data:any,
    private NoteService: NoteService, private service: UserService
                  ) { }
  URL = environment.URL;

  public image = this.data.user.imageUrl;
  public imagepath = this.URL + this.image;
  public email = this.data.user.email;
  public firstname = this.data.user.firstName;
  public lastname = this.data.user.lastname;
  private done=false;
  public searchInput;
  public searchResult;
private initial=""
private title;
private description;
private id;
private bgcolor=this.data.color;
  private labels = [];
  private checklist=false;
  private modifiedCheckList;
  private newList;
  private tempArray=[]
  private newData:any={}
private arrayObj:any={}
private reminder=[];
private collab=false;
public collabs=[];
  ngOnInit() {
    if (this.data.collaborators != undefined) {
      this.collabs = this.data.collaborators;

    }
  
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
  private removedList;
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
 
  private adding=false;
  private addCheck=false;
  private status="open"
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
  splice(firstName) {
    this.initial = firstName[0];
    this.initial = this.initial.toUpperCase()
    return true;
  }
  collabratorClicked(){
    this.collab=!this.collab
  }
  search(){
    this.done = true;
    if (this.searchInput !== "") {

      let RequestBody = {
        "searchWord": this.searchInput
      }
      this.service.searchList(RequestBody).subscribe(response => {
        this.searchResult = response['data'].details
      }, error => {
      })
    }
  }
 
  userSelected(user) {
    this.selectedUser = user
    this.searchInput = user.email;
    this.done = true;
  }
  public selectedUser;
  addCollab() {
    let RequestBody =this.selectedUser;
    this.NoteService.addCollaborator(RequestBody, this.data.id).subscribe(response => {
      this.collabs.push(this.selectedUser);
      this.searchInput = " ";
      this.done = false;
    })

  }
  removeCollaborator(collabObj) {
        this.NoteService.removeCollabrator(this.data.id, collabObj.userId).subscribe(response => {
      for (let i = 0; i <=this.collabs.length; i++) {
        if (collabObj.userId === this.collabs[i].userId) {
          this.collabs.splice(i, 1)
        }
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }


