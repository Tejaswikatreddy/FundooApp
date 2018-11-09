import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { httpService } from '../../core/services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  constructor(private service: httpService) { }
  @Input() Note: object;
  @Output() labelArray=[];
  @Input() Delete;
  public flag = true;
  public checked = false;
  public isDeleted=false;
  @Output() eventEmit = new EventEmitter();
  @Output() labelEvent = new EventEmitter();
  public noteLabels = [];
  public search;
  public checkFlag=false;
  ngOnInit() {

    if (this.Note != undefined && this.Note['isDeleted']==true){
          this.isDeleted=true;
   }

    if (this.Note != null && this.Note['noteLabels']!=null){    
      for (var i = 0; i < this.Note['noteLabels'].length; i++) {
        this.noteLabels.push(this.Note['noteLabels'][i])
      }
    }
    if (this.Note != null && this.Note['noteCheckLists'] != null) {    
      this.checkFlag=true;
    }

      this.getLabels();
      
  }
  
 
  deleteFunction(val) {
    console.log("delete funtion")
    var arr = []
    arr.push(this.Note['id'])
    console.log(arr);
    this.service.postDel("notes/trashNotes",
      {
        "isDeleted": val,
        "noteIdList": arr
      }, localStorage.getItem("id"))
      .subscribe(response => {
        console.log(response);
        this.eventEmit.emit({})
      })
  }
 
 
  getLabels() {
  
    this.service.get("noteLabels/getNoteLabelList", localStorage.getItem('id')).subscribe(
      response => {
        this.labelArray=[];
        this.labelArray = response['data'].details;
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

      console.log(labelObj.id)
      this.service.postDel("/notes/" + this.Note['id'] + "/addLabelToNotes/" + labelObj.id + "/add", null, localStorage.getItem('id'))
        .subscribe(Response => {
          console.log(Response);
          this.eventEmit.emit({})
        }, error => {
          console.log(error)
        })
      }
    if (this.Note != null && labelObj.isChecked==true){
      this.service.postDel("/notes/" + this.Note['id'] + "/addLabelToNotes/" + labelObj.id + "/remove", null, localStorage.getItem('id'))
        .subscribe(Response => {
          console.log(Response);
          this.eventEmit.emit({})
        }, error => {
          console.log(error)
        })
    }
    }
  checklist(){
    this.eventEmit.emit({})

  }
  hideCheck(){
    this.eventEmit.emit("hide")
  }
}
