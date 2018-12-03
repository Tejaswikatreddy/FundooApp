import { Component, OnInit, OnDestroy} from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Note } from "../../core/models/noteModel"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public reminderArray=[];
  public reminder=true;
  public loader = false;

  constructor(private NoteService: NoteService) { }
  list: Note[] = [];

  ngOnInit() {
    this.loader=false;
    this.NoteService.getReminderNOteList()
      .pipe(takeUntil(this.destroy$))
    .subscribe(response=>{
      this.list = response['data'].data
      for (let i = 0; i < this.list .length; i++) {
       
        this.reminderArray.push(this.list [i])
      }
        for (let i = 0; i < this.reminderArray.length; i++) {
        for (let j = i + 1; j < this.reminderArray.length; j++) {
        if (new Date(this.reminderArray[i].reminder).getTime() > 
        new Date(this.reminderArray[j].reminder).getTime()){
                    let temp = this.reminderArray[i];
                    this.reminderArray[i] = this.reminderArray[j];
                    this.reminderArray[j] = temp;
          }
            
        }
        
      }
      this.loader=true;
    })
  
  }
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  
}
