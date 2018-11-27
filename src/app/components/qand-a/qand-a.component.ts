import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../core/services/dataServices/data.service'

@Component({
  selector: 'app-qand-a',
  templateUrl: './qand-a.component.html',
  styleUrls: ['./qand-a.component.scss']
})
export class QandAComponent implements OnInit {

  constructor(private dataservice:DataService) { }
@Input() Note;
public noteObj;
  ngOnInit() {
    this.dataservice.NoteObject.subscribe(
      data=>{
        console.log(data);
        this.noteObj=data;
      }
    )
    console.log(this.noteObj);
    
  }

}
