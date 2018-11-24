import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from '../../core/services/NoteService/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogRef: MatDialogRef<CropImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private NoteService: NoteService) { }

  ngOnInit() {
  }
  public croppedImage:any;
  public selectedFile;
  imageCropped(event){
    this.croppedImage = event.file;
  }
  uploadPic(){
    this.selectedFile = this.croppedImage
    let upLoadData=new FormData()
   upLoadData.append("file", this.selectedFile,this.selectedFile.name);
this.NoteService.addImage(upLoadData)
  .pipe(takeUntil(this.destroy$))
    .subscribe(response=>{
       localStorage.setItem("imageUrl",response['status'].imageUrl)

      this.dialogRef.close();


    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
