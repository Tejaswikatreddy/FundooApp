import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { httpService } from '../../services/http.service';

@Component({
  selector: 'app-label-notes',
  templateUrl: './label-notes.component.html',
  styleUrls: ['./label-notes.component.css']
})
export class LabelNotesComponent implements OnInit {

  constructor(public route: ActivatedRoute,
    private service: httpService) { }
  public labelName ;
  public labelNOtes=[];

  ngOnInit() {
    console.log("in 12");
    this.route.params.subscribe(
      (params: Params) => {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",params['labelName']);
        this.labelName = params['labelName']
        this.getLabelNOtes(this.labelName);
        //------ some code -----
      })
   
    
  }
  getLabelNOtes(labelName){
   
    var url ="notes/getNotesListByLabel/"+labelName
    this.service.postDel(url, null, localStorage.getItem('id')).subscribe(response => {
      console.log("successfull", response);
      this.labelNOtes=response['data'].data
      console.log(this.labelNOtes);
      
    }, error => {
      console.log("failed", error)
    })
   
  }
  eventDone(event){
   this.getLabelNOtes(this.labelName)
  }
  }


