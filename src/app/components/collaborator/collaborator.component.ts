import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
@Input() Note;
  constructor() { }
public isDeleted=false;
  ngOnInit() {
    if (this.Note != undefined && this.Note.isDeleted==true){
      this.isDeleted=true;
    }
  }

}
