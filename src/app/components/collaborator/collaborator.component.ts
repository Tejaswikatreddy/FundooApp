import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment'

import { CollabComponent} from '../collab/collab.component'
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
@Input() Note;
@Input() flag:boolean;
@Output() event=new EventEmitter();
  constructor(public dialog: MatDialog) { }
public isDeleted=false;
  ngOnInit() {
    if (this.Note != undefined && this.Note.isDeleted==true){
      this.isDeleted=true;
    }
   
  }
  open(): void {
if(this.flag!==true){
  
    const dialogRef = this.dialog.open(CollabComponent, {
      width: "400px",
      maxWidth: 'auto',

      data:this.Note
   
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event.emit({})
   
    });
  }
}
}
