/** Purpose         : Note-list page
 *  @description
 *  @file           : Note-list.component.ts
 *  @author         : K.Dhana Tejaswi
*/

import { Component, OnInit,Input,Output ,EventEmitter } from '@angular/core';
import { httpService } from '../../services/http.service';
import { AuthService } from "../../services/auth.service"
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
//component decorator
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NotelistComponent implements OnInit {
 @Input() NoteArray;
  @Input() searchInput;
  public checkArray=[];
 //creating an object for EventEmitter
 @Output() eventEmit=new EventEmitter();
 public isChecked=false;
  constructor(private auth: AuthService, public service: httpService,
              public dialog: MatDialog) { }
  ngOnInit() {  
  }
/**
 * @function eventDone() invoked when there is an event in the child component
 */
 eventDone(event){
   console.log("deleted in note list",event)
   if(event){
     this.eventEmit.emit({});
     //event emitted to the parent component
   }
 }
 /**
  * @function openDialog() opens a popup when clicked on the notes
  * @param note is the object with the details of the note on which it is clicked
  */
  open(note): void {
    console.log(note.color)

    const dialogRef = this.dialog.open(UpdateNoteComponent, {
           data:note,
        });
console.log(note);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.eventEmit.emit({});
   });
  }
  deleteLabel(note,label){
    this.service.postDel("/notes/" + note['id'] + "/addLabelToNotes/" + label.id + "/remove", null, localStorage.getItem('id'))
      .subscribe(Response => {
        console.log(Response);
        this.eventEmit.emit({})
      }, error => {
        console.log(error)
      })
  
  }
  public modifiedCheckList
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
  updatelist(id){
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    this.service.postDel(url, JSON.stringify(apiData), localStorage.getItem('id')).subscribe(response => {
      console.log(response);

    })
  }
  }

  

// noteCheckLists  itemName