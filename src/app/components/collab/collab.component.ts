import { Component, OnInit,Inject } from '@angular/core';
import { environment } from '../../../environments/environment'
import { UserService} from '../../core/services/UserService/user.service'
import {user} from '../../core/models/userModel'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteService} from '../../core/services/NoteService/note.service'
@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.scss']
})
export class CollabComponent implements OnInit {

  constructor(private service: UserService, @Inject(MAT_DIALOG_DATA) public data: any,private noteService:NoteService) { }
  URL = environment.URL;
  public image;
  public imagepath;
  public email;
  public firstname;
  public lastname;
  public searchInput;
  public searchResult:user[]=[]
  public collabs=[];
  ngOnInit() {
    this.image = localStorage.getItem("imageUrl");
    this.imagepath = this.URL + this.image
    this.email=localStorage.getItem("email")
    this.firstname=localStorage.getItem("firstName")
    this.lastname=localStorage.getItem("lastName");
    if (this.data.collaborators!=undefined){
      this.collabs = this.data.collaborators;
    }
  }
  search(){
    if(this.searchInput!="")
{

  let RequestBody={
      "searchWord":this.searchInput
    }
    this.service.searchList(RequestBody).subscribe(response=>{
      this.searchResult=response['data'].details
      console.log(this.searchResult);
    },error=>{
      console.log(error);
      
    })
  }
  }
  public done=false;
  public selectedUser;
  userSelected(user){
      this.selectedUser=user
      this.searchInput=user.email;
      this.done=true;
    
  }
  addCollab(){
      let RequestBody={
        "firstName": this.selectedUser.firstName,
        "lastName": this.selectedUser.lastName,
        "email": this.selectedUser.email,
        "userId": this.selectedUser.userId
      }
      this.noteService.addCollaborator(RequestBody,this.data.id).subscribe(response=>{
        console.log(response);
        this.collabs.push(this.selectedUser);
        this.searchInput=" ";
        this.done=false;
      })
  }
  removeCollaborator(collab){
    console.log(this.data);
    console.log(collab);
    this.noteService.removeCollabrator(this.data.id,collab.userId).subscribe(response=>{
      console.log(response)
    })
    
    
  }
}
