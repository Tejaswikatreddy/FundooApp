/** Purpose         : MainTrash page
 *  @description
 *  @file           : MainTrash.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit } from '@angular/core';
import { httpService } from '../../core/services/http.service';

//component decorator
@Component({
  selector: 'app-main-trash',
  templateUrl: './main-trash.component.html',
  styleUrls: ['./main-trash.component.css']
})
export class MainTrashComponent implements OnInit {

  constructor(public service:httpService) { }
public trashArray=[];
  ngOnInit() {
    this.getList()
  }
  //calling an api to get all the deleted files through the services
  getList(){
    this.service.get("notes/getTrashNotesList", localStorage.getItem("id")).subscribe(response => {
      console.log(response['data'].data)
      this.trashArray=[];
      //wheever there is a response for the api call push it into an array
      for (var i = 0; i < response['data'].data.length; i++) {
        this.trashArray.push(response['data'].data[i])
      }
      console.log("trash", this.trashArray)
    })
  }
eventDone(event){
  console.log("main-trash")
  this.getList();
}
}
