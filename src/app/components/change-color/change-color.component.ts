/** Purpose         : ChangeColor page
 *  @description
 *  @file           : changeColor.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component,Output, OnInit,Input,EventEmitter,OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//component decorator
@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss'],
  
})
export class ChangeColorComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

@Input() Note;
//creates an object for the EventEmitter
@Output() eventEmitter=new EventEmitter(); 
  @Output() eventColor = new EventEmitter(); 
public isDeleted=false;
@Output() colorCode;
  constructor( private NoteService: NoteService) { }

  ngOnInit() {
    if (this.Note != undefined && this.Note.isDeleted == true) {
      this.isDeleted = true;
    }
  }
  change(color){
    this.colorCode = color;
    this.eventColor.emit(this.colorCode)
    if(this.Note!=null){ 
    let arr=[]
    arr.push(this.Note.id)
      let RequestBody = {
        "color": color,
        "noteIdList": arr
      }
      this.NoteService.changeColor(RequestBody)
      .pipe(takeUntil(this.destroy$))
  .subscribe(response=>{
      this.eventEmitter.emit({})
    
    })
  }
  }
  ngOnDestroy() {
    console.log("ondestroy called");
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
