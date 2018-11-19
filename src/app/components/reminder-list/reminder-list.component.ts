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
        for (var i = 0; i < this.reminderArray.length; i++) {
        for (var j = i + 1; j < this.reminderArray.length; j++) {
        if (new Date(this.reminderArray[i].reminder).getTime() > 
        new Date(this.reminderArray[j].reminder).getTime()){
                    let temp = this.reminderArray[i];
                    this.reminderArray[i] = this.reminderArray[j];
                    this.reminderArray[j] = temp;
          }
            
        }
        
      }
    })
  
  }
  
}
