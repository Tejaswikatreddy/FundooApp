/** Purpose         : ChangeColor page
 *  @description
 *  @file           : changeColor.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component,Output, OnInit,Input,EventEmitter } from '@angular/core';
import { httpService } from '../../services/http.service';
//component decorator
@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css'],
  
})
export class ChangeColorComponent implements OnInit {
@Input() Note;
//creates an object for the EventEmitter
@Output() eventEmitter=new EventEmitter(); 
  @Output() eventColor = new EventEmitter(); 
public isDeleted=false;
@Output() colorCode;
  constructor(public service: httpService) { }

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
    this.service.postDel("notes/changesColorNotes",{
      "color":color,
      "noteIdList":arr
    },localStorage.getItem("id")).subscribe(response=>{
      console.log(response);
      this.eventEmitter.emit({})
    
    })
  }
  }
}
