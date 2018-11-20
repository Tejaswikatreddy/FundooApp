import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Label } from "../../core/models/noteModel"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private NoteService: NoteService) { }
  @Input() Note: object;
  @Output() labelArray=[];
  @Input() Delete;
  public flag = true;
  public checked = false;
  public isDeleted=false;
  @Output() eventEmit = new EventEmitter();
  @Output() labelEvent = new EventEmitter();
  @Output() Showchecklist = new EventEmitter();
  public noteLabels = [];
  public search;
  public checkFlag=false;
  public deleteFlag=false;
    labelList: Label[]=[];

  ngOnInit() {

    if (this.Note != undefined && this.Note['isDeleted']==true){
          this.isDeleted=true;
   }

    if (this.Note != null && this.Note['noteLabels']!=null){    
      for (let i = 0; i < this.Note['noteLabels'].length; i++) {
        this.noteLabels.push(this.Note['noteLabels'][i])
      }
    }
    if(this.Note==undefined){
      this.deleteFlag=true;
    }
      
      
  }
  checklist(){
    this.checkFlag=true;
    this.Showchecklist.emit(this.checkFlag)
  }
  hideCheck(){
    this.checkFlag=false;
    this.Showchecklist.emit(this.checkFlag)
  }
 
  deleteFunction(val) {
    let arr = []
    arr.push(this.Note['id'])
    let RequestBody={
      "isDeleted": val,
      "noteIdList": arr
    }
    this.NoteService.trash(RequestBody)
      .pipe(takeUntil(this.destroy$))

          .subscribe(response => {
        this.eventEmit.emit({})
      })
  }
 
 
  getLabels() {
   
    
    this.NoteService.getNoteLabellist()
      .pipe(takeUntil(this.destroy$))

   .subscribe(
      response => {
        this.labelArray=[];
        this.labelList = response['data'].details;
        this.labelArray = this.labelList;
        if(this.noteLabels.length>0){
        for (let i = 0; i < this.labelArray.length; i++) {
          for (let j = 0; j < this.noteLabels.length; j++) {
            if (this.labelArray[i].id == this.noteLabels[j].id) {
              this.labelArray[i].isChecked = true;
            }
          }
        }
      }
      })
  }
public toEvent=[];
  labelSelected(labelObj) {
    this.labelEvent.emit(labelObj)
    if (this.Note != null && labelObj.isChecked==null){    
      this.NoteService.addLabeltoNotes(null, this.Note['id'], labelObj.id)
        .pipe(takeUntil(this.destroy$))

        .subscribe(Response => {
          this.eventEmit.emit({})
        }, error => {
        })
      }
    if (this.Note != null && labelObj.isChecked==true){
      this.NoteService.removeLabelFromNotes(null, this.Note['id'], labelObj.id)
        .pipe(takeUntil(this.destroy$))

        .subscribe(Response => {
          this.eventEmit.emit({})
        }, error => {
        })
    }
    }
 
  deleteForever(){
    let arr = []
    arr.push(this.Note['id'])
    let RequestBody={
      "noteIdList":arr,
    }
    this.NoteService.deleteForever(RequestBody)
      .pipe(takeUntil(this.destroy$))

    .subscribe(
      response=>{
        this.eventEmit.emit({})
      }
    )
  }
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
