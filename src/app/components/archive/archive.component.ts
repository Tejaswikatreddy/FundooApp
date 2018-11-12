import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  @Input() Note;
  @Input() Archive;
  constructor(private service: httpService, private NoteService: NoteService,) { }
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
      var RequestBody = {
        "isArchived": flag,
        "noteIdList": arr

      }
      this.NoteService.archive(RequestBody)
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
