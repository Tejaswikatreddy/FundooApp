import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from '../../core/services/note.service';
import { Label } from "../../core/models/noteModel"

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.css']
})
export class EditLabelComponent implements OnInit {
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
    console.log("addLabel method")
    for (var i = 0; i < this.labelArray.length;i++){
      if (this.myDiv.nativeElement.innerHTML==this.labelArray[i].label){
        this.span=true;
        return;
      }
    }
    this.span=false;
      var RequestBody={
        "label": this.myDiv.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": localStorage.getItem('userId')
      }
      this.NoteService.addLabel(RequestBody)
  .subscribe(response=>{
      console.log(response);
    this.getLabels();

    })
  
  }
  labelList: Label[]=[];
  getLabels(){
   console.log("get labels")
   this.NoteService.getNoteLabellist()
  .subscribe(
      response=>{
        this.labelArray=[];
        this.labelList = response['data'].details;
             
        for (var i = 0; i < (this.labelList.length);i++){
          if (this.labelList[i].isDeleted!=true){
            this.labelArray.push(this.labelList[i])
          }
        }
        console.log(this.labelArray,"labelArray")
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
    .subscribe(response=>{
      console.log(response)
        this.getLabels()
    },error=>{
        console.log(error)
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
    console.log(this.editClick)
   
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
   .subscribe(response=>{
      console.log(response)
      this.getLabels();
    },error=>{
      console.log(error)
    })
  }
  findLabel(newLabel){
    console.log(this.labelArray.indexOf(newLabel))
    return this.labelArray.indexOf(newLabel);
  }
}
