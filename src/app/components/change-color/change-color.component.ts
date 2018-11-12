/** Purpose         : ChangeColor page
 *  @description
 *  @file           : changeColor.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component,Output, OnInit,Input,EventEmitter } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';

//component decorator
@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss'],
  
})
export class ChangeColorComponent implements OnInit {
@Input() Note;
//creates an object for the EventEmitter
@Output() eventEmitter=new EventEmitter(); 
  @Output() eventColor = new EventEmitter(); 
public isDeleted=false;
@Output() colorCode;
  constructor(public service: httpService, private NoteService: NoteService) { }

  ngOnInit() {
    if (this.Note != undefined && this.Note.isDeleted == true) {
      this.isDeleted = true;
    }
  }
  change(color){
    this.colorCode = color;
    this.eventColor.emit(this.colorCode)
    if(this.Note!=null){ 
    var arr=[]
    arr.push(this.Note.id)
      var RequestBody = {
        "color": color,
        "noteIdList": arr
      }
      this.NoteService.changeColor(RequestBody)
  .subscribe(response=>{
      console.log(response);
      this.eventEmitter.emit({})
    
    })
  }
  }
}
