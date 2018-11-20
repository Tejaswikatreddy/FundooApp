import { Component, OnInit, Inject, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Label } from "../../core/models/noteModel"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public labelArray=[];
  public labelNames=[];
  public editId;
  public editLabel;
  public editable=false; 
  public editClick = false;
  public editDoneIcon=true
  constructor(public labelRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private NoteService: NoteService) { }
public label;
  @ViewChild('myDiv') public myDiv: ElementRef;
  @ViewChild('editDiv') public editDiv: ElementRef;

  
  ngOnInit() {
    this.span=false;
    this.getLabels();
  }
  onClose(): void {
    this.labelRef.close();
    this.addLabel();
    // this.getLabels();

  }
  public span;
  addLabel(){
    for (let i = 0; i < this.labelArray.length;i++){
      if (this.myDiv.nativeElement.innerHTML==this.labelArray[i].label){
        this.span=true;
        return;
      }
    }
    this.span=false;
      let RequestBody={
        "label": this.myDiv.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": localStorage.getItem('userId')
      }
      this.NoteService.addLabel(RequestBody)
        .pipe(takeUntil(this.destroy$))
  .subscribe(response=>{
    this.getLabels();

    })
  
  }
  labelList: Label[]=[];
  getLabels(){
   this.NoteService.getNoteLabellist()
     .pipe(takeUntil(this.destroy$))
  .subscribe(
      response=>{
        this.labelArray=[];
        this.labelList = response['data'].details;
             
        for (let i = 0; i < (this.labelList.length);i++){
          if (this.labelList[i].isDeleted!=true){
            this.labelArray.push(this.labelList[i])
          }
        }
        this.labelNames.sort()
      }
    )
      
  }

  done(){
    this.addLabel();
    this.myDiv.nativeElement.innerHTML = null;

  }
  delete(labelId){
    this.NoteService.deleteLabel(labelId)
     .pipe(takeUntil(this.destroy$))
    .subscribe(response=>{
        this.getLabels()
    },error=>{
      })
  }
  clear(){
    this.myDiv.nativeElement.innerHTML = null;
  }
  edit(label){
    this.editClick=true;
    this.editId=label.id;
    this.editLabel=label.label;
    this.editDoneIcon=false;
    this.editable=true;
   
  }
  editDone(label){
    this.editDoneIcon = true;
    this.editClick=false;
    this.editable=false;
    let RequestBody={
      "label": this.editDiv.nativeElement.innerHTML,
      "isDeleted": false,
      "id": label.id,
      "userId": localStorage.getItem('userId')
    }
    this.NoteService.editLabel(label.id, RequestBody)
      .pipe(takeUntil(this.destroy$))

   .subscribe(response=>{
      this.getLabels();
    },error=>{
    })
  }
  findLabel(newLabel){
    return this.labelArray.indexOf(newLabel);
  }
  ngOnDestroy() {
    console.log("ondestroy called");
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
