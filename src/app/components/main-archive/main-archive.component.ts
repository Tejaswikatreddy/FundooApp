/** Purpose         : MainArchive page
 *  @description
 *  @file           : MainArchive.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Note } from "../../core/models/noteModel"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//component decorator
@Component({
  selector: 'app-main-archive',
  templateUrl: './main-archive.component.html',
  styleUrls: ['./main-archive.component.scss']
})
export class MainArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private NoteService: NoteService) { }
  archiveArray = [];
  list: Note[] = [];

  ngOnInit() {
    this.getList();
  }
  //calling an api to get all the archive3d notes through services
  getList(){
    this.NoteService.getArchiveNotes()
      .pipe(takeUntil(this.destroy$))

   .subscribe(response=>{
    
     this.list = response['data'].data
      this.archiveArray=[];
      //whenever there is a response for the api call push it into an array
     for (let i = 0; i < this.list.length;i++){
       if (this.list[i].isDeleted==false){
         this.archiveArray.push(this.list[i])
            }      
          }
    })
  }
  eventDone(event){
    this.getList();
  }
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
