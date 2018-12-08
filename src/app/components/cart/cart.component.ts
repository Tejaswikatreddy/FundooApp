import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PackDetailsComponent } from '../pack-details/pack-details.component';
import { UserService } from '../../core/services/UserService/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog,private userService:UserService) { }
  public selectedBefore=false;
public array=[];
  ngOnInit() {
    
    this.userService.getCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        // console.log(response["data"].data);
        for (let i = 0; i < response["data"].data.length; i++) {
          response["data"].data[i].select = false;
          this.array.push(response["data"].data[i])
        }
        console.log(this.array);
      });  
   
  }
  clicked(card){
    card.select = true;
    for (let i = 0; i < this.array.length; i++) {
      if (card.index == this.array[i].index) {
        continue;
      }
      this.array[i].select = false;
    }
  }
  open(card){
      console.log("open the dialog");
      const dialogRef = this.dialog.open(PackDetailsComponent, {
        data:card,
        maxHeight:"400px",
        width: "550px",
        maxWidth: 'auto',
        
      });
      dialogRef.afterClosed().subscribe(result => {
        this.array[0].select=false;
        this.array[1].select = false;
        
      });
  }
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
