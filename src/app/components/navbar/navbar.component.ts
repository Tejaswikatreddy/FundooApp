/** Purpose         : Navbar page
 *  @description
 *  @file           : Navbar.component.ts
 *  @author         : K.Dhana Tejaswi
*/


import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, Params, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../core/services/dataServices/data.service';
import { CropImageComponent } from '../crop-image/crop-image.component';

import { AuthService } from "../../core/services/authServices/auth.service"
import { NoteService } from "../../core/services/NoteService/note.service"
import { Label } from "../../core/models/noteModel"

import { environment } from '../../../environments/environment'

import { UserService } from "../../core/services/UserService/user.service"
import { MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//component decorator
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  URL = environment.URL;

  destroy$: Subject<boolean> = new Subject<boolean>();
  public searchDisplay = false
  public clicked = false;
  public list;
  public data: any = {}
  public firstname = localStorage.getItem("firstName")
  public lastname = localStorage.getItem("lastName")
  public frstLetter = this.firstname[0];
  public email = localStorage.getItem("email")
  public image = localStorage.getItem("imageUrl")
  public imagepath = this.URL + this.image
  public Fundoo;
  labelList: Label[] = [];
  public notes = false;
  public reminders = false;
  public trash = false;
  public archive = false;
 public viewFlag=true;
  //creating an object for EventEmitter
  @Output() eventEmit = new EventEmitter();

  public searchInput;
  public labels = false;
  public labelHigh;

  ngOnInit() {
    this.route.firstChild.paramMap.subscribe(
      (params: ParamMap) => {
        this.Fundoo = params['params'].labelName;
        if (params['params'].labelName!==undefined){
          this.labels=true;
        }
        this.labelHigh = params['params'].labelName;
      })
    this.dataService.viewLabel.subscribe(response => {
      if (response != "default message") {
        this.router.navigate(["label/" + response])
      }
    })
    this.dataService.viewFlag.subscribe(response=>{
      if(response==false)
      this.viewFlag=false
      else
      this.viewFlag=true;
    })
    if(this.labels===false){
    if (this.router.url == "/home") {
      this.viewFlag = true;
      this.Fundoo = "Fundoo Notes"
      this.notes=true;
      this.labelHigh=""
    }
    else if (this.router.url == "/archive") {
      this.viewFlag = true;
      this.Fundoo = "Archive"
      this.archive=true;
      this.labelHigh = ""
    }
    else if (this.router.url == "/details") {
      
      this.Fundoo = "Fundoo Notes"
      this.labelHigh = ""
    }
    else if (this.router.url == "/remainder") {
      this.viewFlag = true;
      this.Fundoo = "Reminder";
      this.reminders=true;
      this.labelHigh = ""
    }
    else if (this.router.url == "/trash") {
      this.viewFlag = true;
      this.Fundoo = "Trash";
      this.trash=true;
      this.labelHigh = ""
    }
    else if (this.router.url == "/search") {
      this.viewFlag = true;
      this.Fundoo = "Fundoo Notes";
      this.labelHigh = ""
    }
    else{
       this.Fundoo="QandA";
       this.viewFlag=false;
    }
  }
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map(result => result.matches)
    );


  constructor(private breakpointObserver: BreakpointObserver, public router: Router,
    private auth: AuthService, public dialog: MatDialog,
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
  logout() {
    this.Userservice.logout(null)
      .pipe(takeUntil(this.destroy$))

      .subscribe(response => {
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('imageUrl')
        this.auth.removeToken();
        //when logged out navigate the page to login page
        this.router.navigate(['login']);

      }, error => {

      })


  }
  /**
   * @function Archiveclicked() invoked when the Archive is clicked in the navbar
   */
  ArchiveClicked() {
    this.viewFlag = true;
    this.searchInput = "";
    this.archive=true;
    this.trash = false;
    this.notes = false;
    this.reminders=false;
    this.labelHigh = ""
    this.Fundoo = "Archive"
    this.router.navigate(['archive'])
  }
  /**
   * @function TrashClicked() invoked when Trash is clicked in the sidenav
   */
  TrashClicked() {
    this.viewFlag=true;
    this.searchInput = "";
    this.trash=true;
    this.archive = false;
    this.reminders = false;
    this.notes = false;
    this.labelHigh = ""
    this.Fundoo = "Trash"
    this.router.navigate(['trash'])

  }
  /**
   * @function NoteClicked() whenever the notes is clicked in the sidenav
   */
  NoteClicked() {
    this.viewFlag = true;
    this.searchInput = "";
    this.notes=true;
    this.trash=false;
    this.archive=false;
    this.reminders=false;
    this.labelHigh = ""
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
      'panelClass': "label"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLabels();
      this.eventEmit.emit({});

    });
  }
  public labelArray = [];
  public labelName;
  getLabels() {
    this.NoteService.getNoteLabellist()
      .pipe(takeUntil(this.destroy$))

      .subscribe(
        response => {
          this.labelList = response['data'].details;
          this.labelArray = this.labelList;
        })

  }
  ReminderClicked() {
    this.viewFlag = true;
    this.Fundoo = "Reminder";
    this.reminders=true;
    this.notes=false;
    this.trash=false;
    this.archive=false;
    this.labelHigh = ""
    this.router.navigate(['remainder'])
  }
  cartClick(){
    console.log("cart clicked")
    this.Fundoo="Fundoo Notes"
   this.router.navigate(['details'])
  }
  searchClicked() {
    // this.Fundoo = "Search";
    this.router.navigate(['search'])
  }
  passMessage() {
    this.dataService.changeMessage(this.searchInput)
  }

  labelClicked(label) {
    this.viewFlag = true;
    this.reminders = false;
    this.notes = false;
    this.trash = false;
    this.archive = false;
    let labelName = label.label;
    this.labelHigh=label.label
    this.Fundoo = labelName;
    this.router.navigate(["label/" + labelName])
  }

  public selectedFile;
  public imageChangedEvent: any = '';
  fileSelected(event) {
    const dialogRef = this.dialog.open(CropImageComponent, {
      data: event
    });
    dialogRef.afterClosed().subscribe(result => {
      this.image = localStorage.getItem("imageUrl")
      this.imagepath = this.URL + this.image
    });

  }

  public croppedImage: any = '';
  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }
  viewClicked() {
    this.list = !this.list;
    this.dataService.changeView(this.list)
  }
  refresh() {

  }
  ngOnDestroy() {

    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
