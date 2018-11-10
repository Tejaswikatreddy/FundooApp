import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { httpService } from '../../core/services/http.service';
import { NoteService } from '../../core/services/note.service';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CropImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public service: httpService, private NoteService: NoteService) { }

  ngOnInit() {
  }
  public croppedImage:any;
  public selectedFile;
  imageCropped(event){
    this.croppedImage = event.file;
  }
  uploadPic(){
    console.log(this.croppedImage)
    this.selectedFile = this.croppedImage
    var upLoadData=new FormData()
   upLoadData.append("file", this.selectedFile,this.selectedFile.name);
 console.log(upLoadData);
this.NoteService.addImage(upLoadData)
    .subscribe(response=>{
      console.log(response)
       localStorage.setItem("imageUrl",response['status'].imageUrl)

      this.dialogRef.close();


    })
  }
}
