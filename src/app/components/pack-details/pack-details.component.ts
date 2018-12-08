import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../core/services/UserService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pack-details',
  templateUrl: './pack-details.component.html',
  styleUrls: ['./pack-details.component.scss']
})
export class PackDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PackDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private userService:UserService,private router:Router) {
    dialogRef.disableClose = true;
  }
  ngOnInit() {
    console.log(this.data);
    
  }
  proceed(){
    this.userService.addtoCart({
      "productId":this.data.id
    }).subscribe(response=>
      {
        console.log(response['data'].details.id);
      localStorage.setItem("cartId", response['data'].details.id);
      this.onClose();
      this.router.navigate(['signup'])
        
      })

  }
  onClose(): void {
    this.dialogRef.close();
  }
}
