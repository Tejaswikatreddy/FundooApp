import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-remind-me',
  templateUrl: './remind-me.component.html',
  styleUrls: ['./remind-me.component.css']
})
export class RemindMeComponent implements OnInit {
@Input()  Note;
  public isDeleted = false;

  constructor() { }

  ngOnInit() {
    if (this.Note!=undefined && this.Note.isDeleted == true) {
      this.isDeleted = true;
    }
  }

}
