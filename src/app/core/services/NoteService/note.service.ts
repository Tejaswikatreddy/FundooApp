import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { httpService } from '../httpService/http.service';
import { environment} from '../../../../environments/environment'
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
    this.url = this.URL+"/notes/addNotes";
   return this.service.PostUrlEncoded(this.url, RequestBody)
  }
  UpdateNote(RequestBody){
  
    this.url = this.URL + "/notes/updateNotes";
    return this.service.PostUrlEncoded(this.url, RequestBody)

  }
  UpdateChecklist(RequestBody,noteId,ChecklistId){
    
    this.url = this.URL + "/notes/" + noteId + "/checklist/" + ChecklistId + "/update";
    return this.service.PostJson(this.url, RequestBody)

  }
  removeChecklist(RequestBody,noteId,checklistId){
   
    this.url = this.URL + "/notes/" + noteId + "/checklist/" + checklistId + "/remove";
    return this.service.PostJson(this.url, RequestBody)

  }
  addChecklist(RequestBody,noteId){
   
    this.url = this.URL + "/notes/"+noteId+"/checklist/add";
    return this.service.PostJson(this.url, RequestBody)

  }
  archive(RequestBody){
   
    this.url = this.URL +"/notes/archiveNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  trash(RequestBody){
  
    this.url = this.URL +"/notes/trashNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  changeColor(RequestBody){
   
    this.url = this.URL +"/notes/changesColorNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  addImage(RequestBody){
   
    this.url = this.URL +"/user/uploadProfileImage";
    return this.service.PostImage(this.url, RequestBody)

  }
  addLabel(RequestBody){
    
    this.url = this.URL +"/noteLabels"
    return this.service.PostJson(this.url, RequestBody)

  }
   editLabel(labelId, RequestBody){
   
    this.url = this.URL + "/noteLabels/"+labelId+"/updateNoteLabel";
    return this.service.PostJson(this.url, RequestBody)

  }
    addLabeltoNotes(RequestBody,noteId,labelId){
  
    this.url = this.URL + "/notes/" + noteId + "/addLabelToNotes/" + labelId + "/add"
    return this.service.PostJson(this.url, RequestBody)

  }
  removeLabelFromNotes(RequestBody,noteId,labelId){
   
    this.url = this.URL + "/notes/"+noteId+"/addLabelToNotes/" +labelId+ "/remove";
    return this.service.PostJson(this.url, RequestBody)

  }
  pin(RequestBody){
   
    this.url = this.URL +"/notes/pinUnpinNotes";
    return this.service.PostJson(this.url, RequestBody)

  }
  getNoteLabellist(){
    
    this.url = this.URL + "/noteLabels/getNoteLabelList"
    return this.service.getUrlEncoded(this.url)
  }
  
  getLabelNotes(labelName){
   
    this.url = this.URL +"/notes/getNotesListByLabel/"+labelName;
    return this.service.PostJson(this.url,null)
  }
   addReminder(RequestBody){
   
    this.url = this.URL +"/notes/addUpdateReminderNotes";
    return this.service.PostJson(this.url, RequestBody)
  }
  deleteForever(RequestBody){
  
    this.url = this.URL +"/notes/deleteForeverNotes";
    return this.service.PostJson(this.url,RequestBody)
  }
  deleteReminder(RequestBody){
    this.url = this.URL +"/notes/removeReminderNotes";
    return this.service.PostJson(this.url,RequestBody)
  }
  getArchiveNotes(){
       this.url = this.URL +"/notes/getArchiveNotesList";
    return this.service.getUrlEncoded(this.url)
  }
  getTrashNotes(){
    
    
    this.url = this.URL +"/notes/getTrashNotesList";
    return this.service.getUrlEncoded(this.url)
  }
  getReminderNOteList(){
    
    this.url = this.URL +"/notes/getReminderNotesList";
    return this.service.getJson(this.url);
  }

  getNotes(){
   
    this.url = this.URL +"/notes/getNotesList";
    return this.service.getUrlEncoded(this.url)
  }
  deleteLabel(labelId) {

    this.url = this.URL + "/noteLabels/" + labelId + "/deleteNoteLabel";
    return this.service.delete(this.url);
  }

}
