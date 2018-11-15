import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../core/services/note.service';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit {
  public reminderArray=[];
  public reminder=true;
  constructor(private NoteService: NoteService) { }

  ngOnInit() {
    this.NoteService.getReminderNOteList().subscribe(response=>{
      console.log(response)
      for (var i = 0; i < response['data'].data.length; i++) {
        this.reminderArray.push(response['data'].data[i])

      }
    })
  }
  
}
