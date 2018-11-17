import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';

@Component({
  selector: 'app-label-notes',
  templateUrl: './label-notes.component.html',
  styleUrls: ['./label-notes.component.css']
})
export class LabelNotesComponent implements OnInit {

  constructor(public route: ActivatedRoute,
    private service: httpService, private NoteService: NoteService) { }
  public labelName ;
  public labelNOtes=[];

  ngOnInit() {
    console.log("in 12");
    this.route.params.subscribe(
      (params: Params) => {
        console.log("hhhhh",params);
        this.labelName = params['labelName']
        this.getLabelNOtes(this.labelName);
        
      })
   
    
  }
  getLabelNOtes(labelName){
   
    var url ="notes/getNotesListByLabel/"+labelName
    this.NoteService.getLabelNotes(labelName)
  .subscribe(response => {
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


