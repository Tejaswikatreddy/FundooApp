/** Purpose         : Navbar page
 *  @description
 *  @file           : Navbar.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { httpService } from '../../core/services/http.service';
import { DataService } from '../../core/services/data.service';
import { CropImageComponent } from '../crop-image/crop-image.component';

import { AuthService } from "../../core/services/auth.service"
import { MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
//component decorator
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
public clicked=false;
public data:any={}
public firstname=localStorage.getItem("firstName")
public lastname = localStorage.getItem("lastName")
public frstLetter=this.firstname[0];
public email = localStorage.getItem("email")
  public image=localStorage.getItem("imageUrl")
  public imagepath = "http://34.213.106.173/"+this.image
//creating an object for EventEmitter
  @Output() eventEmit = new EventEmitter();
public searchInput;
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, public router: Router, 
    private service: httpService, private auth: AuthService, public dialog: MatDialog,
    public dataService: DataService) {
   
  
    }
  public onReturnData(data: any) {
    // Do what you want to do
    console.warn(JSON.parse(data));
  }

/**
 * @function logout() is invoked when the logout button is clicked
 */
  logout(){
    console.log("logout function")
   console.log(this.auth.getToken())
    this.service.post("/user/logout",this.data,this.auth.getToken()).subscribe(response=>{
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
      localStorage.removeItem('userId')
      localStorage.removeItem('email')
        this.auth.removeToken();
        // console.log(response);
        //when logged out navigate the page to login page
        this.router.navigate(['login']);
      
    },error=>{
        if(error){
          console.log(error);
        }
    })
  
   
  }
  /**
   * @function Archiveclicked() invoked when the Archive is clicked in the navbar
   */
  ArchiveClicked(){
    this.searchInput="";
    this.router.navigate(['archive'])
  }
  /**
   * @function TrashClicked() invoked when Trash is clicked in the sidenav
   */
  TrashClicked(){
    this.searchInput = "";
    this.router.navigate(['trash'])

  }
  /**
   * @function NoteClicked() whenever the notes is clicked in the sidenav
   */
  NoteClicked(){
    this.searchInput = "";
    this.router.navigate(['home'])
  }
  /**
   * 
   * @function OpenDialog() when the create label is clicked it is invoked to display a popup
   * 
   */
  openDialog(note): void {
    const dialogRef = this.dialog.open(EditLabelComponent, {
  'panelClass':"label"
    });
    console.log(note);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getLabels();
      this.eventEmit.emit({});
     
    });
  }


  



  public labelArray=[];
  public labelName;
  getLabels() {

    this.service.get("noteLabels/getNoteLabelList", localStorage.getItem('id')).subscribe(
      response => {
        this.labelArray = response['data'].details;
      })

    }
  ngOnInit() {
   
    
    if(localStorage.getItem('id')!=null){
    this.getLabels();
    }
  }
  searchClicked(){
   
    this.router.navigate(['search'])
  }
  passMessage(){
    this.dataService.changeMessage(this.searchInput)
  }
  labelClicked(label){
    //this.dataService.isLabelChanged.next(true)
    var label=label.label;
    this.router.navigate(["label/"+label])
  }
  public selectedFile;
  public imageChangedEvent: any = '';
  fileSelected(event){
    const dialogRef = this.dialog.open(CropImageComponent, {
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.image = localStorage.getItem("imageUrl")
this.imagepath = "http://34.213.106.173/" + this.image
    });

  }
 
  public croppedImage: any = '';
  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }
  }
