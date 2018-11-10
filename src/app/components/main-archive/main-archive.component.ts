/** Purpose         : MainArchive page
 *  @description
 *  @file           : MainArchive.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';

//component decorator
@Component({
  selector: 'app-main-archive',
  templateUrl: './main-archive.component.html',
  styleUrls: ['./main-archive.component.css']
})
export class MainArchiveComponent implements OnInit {

  constructor(public service: httpService, private NoteService: NoteService) { }
  archiveArray = [];
 
  ngOnInit() {
    this.getList();
  }
  //calling an api to get all the archive3d notes through services
  getList(){
    this.NoteService.getArchiveNotes()
   .subscribe(response=>{
      console.log(response['data'].data)
      this.archiveArray=[];
      //whenever there is a response for the api call push it into an array
      for (var i = 0; i < response['data'].data.length;i++){
        if (response['data'].data[i].isDeleted==false){
        this.archiveArray.push(response['data'].data[i])
            }      
          }
      console.log("Archive",this.archiveArray)
    })
  }
  eventDone(event){
    this.getList();
  }
}
