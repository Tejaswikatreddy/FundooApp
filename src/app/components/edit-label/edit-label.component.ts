import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { httpService } from '../../core/services/http.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,public service:httpService) { }
public label;
  @ViewChild('myDiv') public myDiv: ElementRef;
  @ViewChild('editDiv') public editDiv: ElementRef;

  
  ngOnInit() {
    this.getLabels();
  }
  onClose(): void {
    this.labelRef.close();
    this.addLabel();
    // this.getLabels();

  }
  addLabel(){
    console.log("addLabel method")
    // if (this.findLabel(this.myDiv.nativeElement.innerHTML) >= 0 ){
    this.service.postDel("noteLabels",{
      "label": this.myDiv.nativeElement.innerHTML,
      "isDeleted": false,
      // "userId": "string",
      "userId": localStorage.getItem('userId')
    },localStorage.getItem('id')).subscribe(response=>{
      console.log(response)
    })
  // }
  }
  getLabels(){
   console.log("get labels")
    this.service.get("noteLabels/getNoteLabelList",localStorage.getItem('id')).subscribe(
      response=>{
        this.labelArray=[];
              console.log(response['data'].details);
        for (var i =0;i< (response['data'].details.length);i++){
          if (response['data'].details[i].isDeleted!=true){
            this.labelArray.push(response['data'].details[i])
          }
        }
        console.log(this.labelArray,"labelArray")
        this.labelNames.sort()
      }
    )
      
  }

  done(){
    this.addLabel();
    this.getLabels();
    this.myDiv.nativeElement.innerHTML = null;

  }
  delete(labelId){
    var url = "noteLabels/" + labelId +"/deleteNoteLabel"
    this.service.delete(url,localStorage.getItem('id')).subscribe(response=>{
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
     var url = "noteLabels/" + label.id +"/updateNoteLabel"
    this.service.postDel(url,{
      "label": this.editDiv.nativeElement.innerHTML ,
      "isDeleted": false,
      "id":label.id,
      "userId":localStorage.getItem('userId')
    },localStorage.getItem('id')).subscribe(response=>{
      console.log(response)
      // this.editDiv.nativeElement.innerHTML =null;
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
