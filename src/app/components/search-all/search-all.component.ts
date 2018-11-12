import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';



@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.scss']
})
export class SearchAllComponent implements OnInit {

  constructor(private dataService: DataService, public service: httpService,public noteService:NoteService) { }
  // public message;
  public searchInput;
  ngOnInit() {
        this.dataService.currentMessage.subscribe(message => { 
      this.searchInput = message 
      console.log(this.searchInput, "search component");
    })   
    this.getNotes();
  }
  public notes = [];
  public getNotes() {
    this.noteService.getNotes()
  .subscribe(response => {
      if (response) {
        // this.notes = [];
        //whenever  the api call is a success,push the response into an array
        for (var i = response['data'].data.length - 1; i >= 0; i--) {
          if (response['data'].data[i].isDeleted == false && response['data'].data[i].isArchived == false) {
            this.notes.push(response['data'].data[i])
          }
        }
        // console.log("array", this.notes)

      }
    })
  }
}
