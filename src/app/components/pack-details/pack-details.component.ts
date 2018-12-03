import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-pack-details',
  templateUrl: './pack-details.component.html',
  styleUrls: ['./pack-details.component.scss']
})
export class PackDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PackDetailsComponent>) {
    dialogRef.disableClose = true;
  }
  ngOnInit() {
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
