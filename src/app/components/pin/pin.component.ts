import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

@Output() eventEmit=new EventEmitter();
@Input() Note;
public isDeleted=false;
public isPinned=false;
public apiPinned=true;;
  constructor(public NoteService:NoteService) { }

  ngOnInit() {
    if (this.Note != undefined && this.Note.isDeleted == true ) {
      this.isDeleted = true;
    }
    if (this.Note != undefined && this.Note.isPined == true) {
      this.isPinned = true;
     
    }
  }
 pin(){
   this.eventEmit.emit({});
   if(this.Note!==undefined){
    
     
     if (this.Note.isPined == true){
       this.apiPinned = false;
     }
     let arr = []
     arr.push(this.Note.id)
     if (this.Note.id != undefined) {
       let Request={
         "isPined": this.apiPinned,
         "noteIdList": arr
       }
       this.NoteService.pin(Request)
         .pipe(takeUntil(this.destroy$))

         .subscribe(response => {
       
           this.eventEmit.emit({})
         }, error => {
         })
     }
   }
 
  }
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
