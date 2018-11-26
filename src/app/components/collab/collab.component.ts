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

  constructor(private service: UserService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CollabComponent>,private noteService:NoteService) { }
  URL = environment.URL;
  public image = this.data.user.imageUrl;
  public imagepath = this.URL + this.image;
  public email = this.data.user.email ;
  public firstname = this.data.user.firstName;
  public lastname = this.data.user.lastname;
  public searchInput;
  public searchResult:user[]=[]
  public collabs=[];
public initial:String;
  ngOnInit() {
       if (this.data.collaborators!=undefined){
      this.collabs = this.data.collaborators;

    }
  }
  splice(firstName){
    this.initial=firstName[0];
    this.initial=this.initial.toUpperCase()
    return true;
  }
  search(){
    this.done=true;
    if(this.searchInput!=="")
{

  let RequestBody={
      "searchWord":this.searchInput
    }
    this.service.searchList(RequestBody).subscribe(response=>{
      this.searchResult=response['data'].details
    },error=>{
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
        this.collabs.push(this.selectedUser);
        this.searchInput=" ";
        this.done=false;
      })
    
  }
  removeCollaborator(collab){
    this.noteService.removeCollabrator(this.data.id,collab.userId).subscribe(response=>{
      for(let i=0;i<this.collabs.length;i++){
        if(collab.id===this.collabs[i].id){
          this.collabs.splice(i,1)
        }
      }
    })    
  }
 
  close()
  {
    console.log("helll");
    
     this.dialogRef.close();
  }
}
