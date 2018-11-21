/** Purpose         : AllNote page
 *  @description
 *  @file           : AllNote.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit,OnDestroy } from '@angular/core';
import { AuthService } from "../../core/services/authServices/auth.service"
import {Note} from "../../core/models/noteModel"
import { NoteService } from "../../core/services/NoteService/note.service"
import { LoggerService } from "../../core/services/logger/logger.service"
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

//component decorator
@Component({
  selector: 'app-all-note',
  templateUrl: './all-note.component.html',
  styleUrls: ['./all-note.component.scss']
})
export class AllNoteComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

list:Note[]=[];
  constructor(private auth: AuthService,
    // private noteModel:Note,
     private noteservice:NoteService) { }
  private notes = [];
  private pinedNotes=[];
private isPined=false;
private Others=false;
  ngOnInit() {
    if(localStorage.getItem('id')!=undefined){
      this.getNotes();
    }
  }
  addNewEntry(event){
    //calling the getNOtes Api when ever there is an event occured in the child components
    
  
      this.getNotes();
  
   
  }
  /**
   * @function getNotes() to call the getNotes() api through services
   */
  private getNotes() {
    this.noteservice.getNotes()
  .pipe(takeUntil(this.destroy$))
  .subscribe(response => {
      if (response) {
        this.list = response['data'].data;
        this.notes = [];
        this.pinedNotes=[];
        //whenever  the api call is a success,push the response into an array
        for (let i = this.list.length - 1; i >= 0; i--) {
          if (this.list[i].isDeleted == false && this.list[i].isArchived == false && this.list[i].isPined==false){
            this.notes.push(this.list[i])
               this.Others=true;
          }
          if (this.list[i].isPined == true && this.list[i].isDeleted == false){
            this.pinedNotes.push(this.list[i])
            this.isPined=true;
          }
          }
        console.log(this.pinedNotes);
     
      }
    })
   

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
 
}
