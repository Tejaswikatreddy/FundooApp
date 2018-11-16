import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { httpService } from './http.service';
import { environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // URL = "http://34.213.106.173/api";
 URL=environment.URL;
  public url;
  public access_token = localStorage.getItem('id');
  public httpOptions; 
  public httpO; 
  public httpImage; 

  constructor(private service: httpService) { }
  NewNote(RequestBody){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL+"/notes/addNotes";
    console.log(RequestBody);
    
   return this.service.NewPost(this.url, RequestBody, this.httpOptions)
  }
  UpdateNote(RequestBody){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/notes/updateNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpOptions)

  }
  UpdateChecklist(RequestBody,noteId,ChecklistId){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/notes/" + noteId + "/checklist/" + ChecklistId + "/update";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  removeChecklist(RequestBody,noteId,checklistId){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/notes/" + noteId + "/checklist/" + checklistId + "/remove";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  addChecklist(RequestBody,noteId){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/notes/"+noteId+"/checklist/add";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  archive(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/archiveNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  trash(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/trashNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  changeColor(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/changesColorNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  addImage(RequestBody){
    this.httpImage = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/user/uploadProfileImage";
    return this.service.NewPost(this.url, RequestBody, this.httpImage)

  }
  addLabel(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/noteLabels"
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  getNoteLabellist(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/noteLabels/getNoteLabelList"
    return this.service.NewGet(this.url, this.httpOptions)
  }
  deleteLabel(labelId){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/noteLabels/" + labelId +"/deleteNoteLabel";
    return this.service.delete(this.url,this.httpO);
  }
  editLabel(labelId, RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/noteLabels/"+labelId+"/updateNoteLabel";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  getLabelNotes(labelName){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/getNotesListByLabel/"+labelName;
    return this.service.NewPost(this.url,null,this.httpO)
  }
  getArchiveNotes(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/getArchiveNotesList";
  return  this.service.NewGet(this.url,this.httpOptions)
  }
  getTrashNotes(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/getTrashNotesList";
    return this.service.NewGet(this.url, this.httpOptions)
  }
  getReminderNOteList(){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/getReminderNotesList";
    return this.service.NewGet(this.url,this.httpO)
  }
  addLabeltoNotes(RequestBody,noteId,labelId){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/notes/" + noteId + "/addLabelToNotes/" + labelId + "/add"
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  removeLabelFromNotes(RequestBody,noteId,labelId){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL + "/notes/"+noteId+"/addLabelToNotes/" +labelId+ "/remove";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  pin(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/pinUnpinNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  getNotes(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/getNotesList";
    return this.service.NewGet(this.url,this.httpOptions)
  }
  addReminder(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/addUpdateReminderNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)
  }
  deleteForever(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/deleteForeverNotes";
    return this.service.NewPost(this.url,RequestBody,this.httpO)
  }
  deleteReminder(RequestBody){
    this.httpO = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id')
      })
    };
    this.url = this.URL +"/notes/removeReminderNotes";
    return this.service.NewPost(this.url,RequestBody,this.httpO)
  }
}
