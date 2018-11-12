/** Purpose         : AllNote page
 *  @description
 *  @file           : AllNote.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { AuthService } from "../../core/services/auth.service"

import { NoteService } from "../../core/services/note.service"
//component decorator
@Component({
  selector: 'app-all-note',
  templateUrl: './all-note.component.html',
  styleUrls: ['./all-note.component.scss']
})
export class AllNoteComponent implements OnInit {

  constructor(private auth: AuthService, public service: httpService,public noteservice:NoteService) { }
  public notes = [];

  ngOnInit() {
    if(localStorage.getItem('id')!=undefined){
      console.log("all notes ts file")

      this.getNotes();

    }
  }
  addNewEntry(event){
    //calling the getNOtes Api when ever there is an event occured in the child components
    
    console.log(event);
  
      this.getNotes();
  
   
  }
  /**
   * @function getNotes() to call the getNotes() api through services
   */
  public getNotes() {
    this.noteservice.getNotes()
  .subscribe(response => {
      if (response) {
        this.notes = [];
        //whenever  the api call is a success,push the response into an array
        for (var i = response['data'].data.length - 1; i >= 0; i--) {
          if (response['data'].data[i].isDeleted == false && response['data'].data[i].isArchived == false){
               this.notes.push(response['data'].data[i])
          }
          }
        console.log("array", this.notes)

      }
    })
  }
 
}
