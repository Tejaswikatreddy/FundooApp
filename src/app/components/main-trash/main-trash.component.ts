/** Purpose         : MainTrash page
 *  @description
 *  @file           : MainTrash.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Note } from "../../core/models/noteModel"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//component decorator
@Component({
  selector: 'app-main-trash',
  templateUrl: './main-trash.component.html',
  styleUrls: ['./main-trash.component.scss']
})
export class MainTrashComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  list: Note[] = [];
  public loader = false;


  constructor( private NoteService: NoteService) { }
public trashArray=[];
  ngOnInit() {
    this.getList()
  }
  //calling an api to get all the deleted files through the services
  getList(){
    this.NoteService.getTrashNotes()
      .pipe(takeUntil(this.destroy$))

   .subscribe(response => {
     this.list = response['data'].data;
      this.trashArray=[];
      //wheever there is a response for the api call push it into an array
     for (let i = 0; i < this.list .length; i++) {
       this.trashArray.push(this.list [i])
      }
      this.loader=true;
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
