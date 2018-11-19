import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';
import { Label } from "../../core/models/noteModel"

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  constructor(private service: httpService, private NoteService: NoteService) { }
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
      for (var i = 0; i < this.Note['noteLabels'].length; i++) {
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
    console.log("delete funtion")
    var arr = []
    arr.push(this.Note['id'])
    console.log(arr);
    let RequestBody={
      "isDeleted": val,
      "noteIdList": arr
    }
    this.NoteService.trash(RequestBody)
          .subscribe(response => {
        console.log(response);
        this.eventEmit.emit({})
      })
  }
 
 
  getLabels() {
   
    
    this.NoteService.getNoteLabellist()
   .subscribe(
      response => {
        this.labelArray=[];
        this.labelList = response['data'].details;
        this.labelArray = this.labelList;
        if(this.noteLabels.length>0){
        for (var i = 0; i < this.labelArray.length; i++) {
          for (var j = 0; j < this.noteLabels.length; j++) {
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
      console.log("add function");
      this.NoteService.addLabeltoNotes(null, this.Note['id'], labelObj.id)
        .subscribe(Response => {
          console.log(Response);
          this.eventEmit.emit({})
        }, error => {
          console.log(error)
        })
      }
    if (this.Note != null && labelObj.isChecked==true){
      this.NoteService.removeLabelFromNotes(null, this.Note['id'], labelObj.id)
        .subscribe(Response => {
          console.log(Response);
          this.eventEmit.emit({})
        }, error => {
          console.log(error)
        })
    }
    }
 
  deleteForever(){
    var arr = []
    arr.push(this.Note['id'])
    var RequestBody={
      "noteIdList":arr,
    }
    this.NoteService.deleteForever(RequestBody).subscribe(
      response=>{
        console.log("success");
        this.eventEmit.emit({})
      }
    )
  }
}
