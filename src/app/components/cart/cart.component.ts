import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PackDetailsComponent } from '../pack-details/pack-details.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  public selectedBefore=false;
public array=[];
  ngOnInit() {
    this.array.push({index:1,select:false})
    this.array.push({ index: 2, select: false })
  }
  clicked(card){
    if(card.select==true){
      this.selectedBefore=true;
      return;
    }
    card.select = true;
    for (let i = 0; i < this.array.length; i++) {
      if (card.index == this.array[i].index) {
        continue;
      }
      this.array[i].select = false;
    }
  }
  open(){
    if(this.selectedBefore==true){
      console.log("open the dialog");
      const dialogRef = this.dialog.open(PackDetailsComponent, {
        width: "600px",
        maxWidth: 'auto',
        
      });
      dialogRef.afterClosed().subscribe(result => {

        
      });
    }
  }
}
