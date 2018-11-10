import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
@Output() eventEmit=new EventEmitter();
@Input() Note;
public isDeleted=false;
public isPinned=false;
public apiPinned=true;;
  constructor(private service: httpService,public NoteService:NoteService) { }

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
     var arr = []
     arr.push(this.Note.id)
     console.log(arr);
     if (this.Note.id != undefined) {
       var Request={
         "isPined": this.apiPinned,
         "noteIdList": arr
       }
       this.NoteService.pin(Request)
         .subscribe(response => {
           console.log(response);
           this.eventEmit.emit({})
         }, error => {
           console.log(error)
         })
     }
   }
 }
}
