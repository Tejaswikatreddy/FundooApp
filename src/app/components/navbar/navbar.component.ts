/** Purpose         : Navbar page
 *  @description
 *  @file           : Navbar.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, Params, ActivatedRoute,ParamMap } from '@angular/router';
import { httpService } from '../../core/services/http.service';
import { DataService } from '../../core/services/data.service';
import { CropImageComponent } from '../crop-image/crop-image.component';

import { AuthService } from "../../core/services/auth.service"
import { NoteService } from "../../core/services/note.service"
import { Label } from "../../core/models/noteModel"


import { UserService } from "../../core/services/user.service"
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
public list;
public data:any={}
public firstname=localStorage.getItem("firstName")
public lastname = localStorage.getItem("lastName")
public frstLetter=this.firstname[0];
public email = localStorage.getItem("email")
  public image=localStorage.getItem("imageUrl")
  public imagepath = "http://34.213.106.173/"+this.image
 public Fundoo;
  labelList: Label[] = [];

//creating an object for EventEmitter
  @Output() eventEmit = new EventEmitter();

public searchInput;
  public labels = false;
  public plz;
 
  ngOnInit() {
    this.route.firstChild.paramMap.subscribe(
      (params: ParamMap) => {
        this.Fundoo = params['params'].labelName;
      })
    this.dataService.viewLabel.subscribe(response => {
      if (response != "default message") {
        this.router.navigate(["label/" + response])
      }
    })
    if (this.router.url == "/home") {
      this.Fundoo = "Fundoo Notes"
    }
    else if (this.router.url == "/archive") {
      this.Fundoo = "Archive"
    }
    else if (this.router.url == "/remainder") {
      this.Fundoo = "Reminder";
    }
    else if (this.router.url == "/trash") {
      this.Fundoo = "Trash";
    }
    else if (this.router.url == "/search") {
      this.Fundoo = "Search";
    }
    
  }
isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Tablet])
    .pipe(
      map(result => result.matches)
    );
 
    
  constructor(private breakpointObserver: BreakpointObserver, public router: Router, 
    private service: httpService, private auth: AuthService, public dialog: MatDialog,
    public dataService: DataService, public Userservice: UserService, public NoteService: NoteService,
    public route: ActivatedRoute) {
   
  
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
   this.Userservice.logout(null)
  .subscribe(response=>{
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
    this.Fundoo = "Archive"
    this.router.navigate(['archive'])
  }
  /**
   * @function TrashClicked() invoked when Trash is clicked in the sidenav
   */
  TrashClicked(){
    this.searchInput = "";
    this.Fundoo="Trash"
    this.router.navigate(['trash'])

  }
  /**
   * @function NoteClicked() whenever the notes is clicked in the sidenav
   */
  NoteClicked(){
    this.searchInput = "";
    this.Fundoo = "Fundoo Notes"
     this.router.navigate(['home'])
  }
  /**
   * 
   * @function OpenDialog() when the create label is clicked it is invoked to display a popup
   * 
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(EditLabelComponent, {
  'panelClass':"label"
    });
    console.log();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getLabels();
      this.eventEmit.emit({});
     
    });
  }
  public labelArray=[];
  public labelName;
  getLabels() {
    this.NoteService.getNoteLabellist()
   .subscribe(
      response => {
        this.labelList = response['data'].details;
        this.labelArray = this.labelList;
      })

    }
  ReminderClicked(){
    this.Fundoo = "Reminder";
    this.router.navigate(['remainder'])
  }
 
  searchClicked(){
    this.Fundoo = "Search";
    this.router.navigate(['search'])
  }
  passMessage(){
    this.dataService.changeMessage(this.searchInput)
  }

  labelClicked(label){
     var label=label.label;
    this.Fundoo = label;
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
  viewClicked(){
    this.list=!this.list;
    this.dataService.changeView(this.list) 
  }
  refresh(){

  }
  }
