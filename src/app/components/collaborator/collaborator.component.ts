import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CollabComponent} from '../collab/collab.component'
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
@Input() Note;
  constructor(public dialog: MatDialog) { }
public isDeleted=false;
  ngOnInit() {
    if (this.Note != undefined && this.Note.isDeleted==true){
      this.isDeleted=true;
    }
  }
  open(): void {

    const dialogRef = this.dialog.open(CollabComponent, {
      data:this.Note
   
    });
    dialogRef.afterClosed().subscribe(result => {

   
    });
  }
}
