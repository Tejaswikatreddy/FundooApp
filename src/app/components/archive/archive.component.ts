import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() Note;
  @Input() Archive;
  constructor(private NoteService: NoteService, public snackbar: MatSnackBar,) { }
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
    let arr = []
    arr.push(this.Note.id)
    if(this.Note.id!=undefined){
      let RequestBody = {
        "isArchived": flag,
        "noteIdList": arr

      }
      this.NoteService.archive(RequestBody)
        .pipe(takeUntil(this.destroy$))
          .subscribe(response => {
            let archived="unarchived"
        this.eventEmit.emit({})
        if(flag===true){
           archived="archived"
        }
            this.snackbar.open(archived, "done", {
              duration: 2000,
            });
      },error=>{
      })
    }
  }
}
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }
