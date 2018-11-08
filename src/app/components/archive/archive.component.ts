import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { httpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  @Input() Note;
  @Input() Archive;
  constructor(private service: httpService) { }
public isArchived=false;
public isDeleted=false;
  ngOnInit() {
    if (this.Note != undefined && this.Note.isArchived==true){
      this.isArchived=true;
    }
    if (this.Note != undefined && this.Note.isDeleted==true){
      this.isDeleted=true;
    }
  }

  @Output() eventEmit = new EventEmitter();

  archive(flag){
    this.eventEmit.emit({})
    if(this.Note!=undefined){
    var arr = []
    arr.push(this.Note.id)
    console.log(arr);
    if(this.Note.id!=undefined){
    this.service.postDel("notes/archiveNotes",
      {
        "isArchived": flag,
        "noteIdList": arr

      }, localStorage.getItem("id"))
      .subscribe(response => {
        console.log(response);
        this.eventEmit.emit({})
      },error=>{
        console.log(error)
      })
    }
  }
}
  }
