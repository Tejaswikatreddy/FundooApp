import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../core/services/dataServices/data.service';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.scss']
})
export class SearchAllComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService, public noteService:NoteService) { }
  // public message;
  public searchInput;
  ngOnInit() {
        this.dataService.currentMessage.subscribe(message => { 
      this.searchInput = message 
    })   
    this.getNotes();
  }
  public notes = [];
  public getNotes() {
    this.noteService.getNotes()
      .pipe(takeUntil(this.destroy$))

  .subscribe(response => {
      if (response) {
        // this.notes = [];
        //whenever  the api call is a success,push the response into an array
        for (let i = response['data'].data.length - 1; i >= 0; i--) {
          if (response['data'].data[i].isDeleted == false && response['data'].data[i].isArchived == false) {
            this.notes.push(response['data'].data[i])
          }
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
