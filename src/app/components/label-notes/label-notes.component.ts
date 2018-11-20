import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Note } from "../../core/models/noteModel"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-label-notes',
  templateUrl: './label-notes.component.html',
  styleUrls: ['./label-notes.component.scss']
})
export class LabelNotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public route: ActivatedRoute,
     private NoteService: NoteService) { }
  public labelName ;
  public labelNOtes: Note[]=[];
  
  ngOnInit() {
      (params: Params) => {
        this.labelName = params['labelName']
        this.getLabelNOtes(this.labelName);
        
      }
   
    
  }
  getLabelNOtes(labelName){
   
    let url ="notes/getNotesListByLabel/"+labelName
    this.NoteService.getLabelNotes(labelName)
      .pipe(takeUntil(this.destroy$))
  .subscribe(response => {
      this.labelNOtes=response['data'].data
      
    }, error => {
    })
   
  }
  eventDone(event){
   this.getLabelNOtes(this.labelName)
  }
  ngOnDestroy() {
   
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  }


