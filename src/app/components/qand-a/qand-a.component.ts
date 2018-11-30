import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NoteService } from '../../core/services/NoteService/note.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Note } from "../../core/models/noteModel"
import { QuesAndAnsService } from "../../core/services/qandA/ques-and-ans.service";
import { environment } from '../../../environments/environment'


@Component({
  selector: 'app-qand-a',
  templateUrl: './qand-a.component.html',
  styleUrls: ['./qand-a.component.scss']
})
export class QandAComponent implements OnInit, OnDestroy {
  @ViewChild('question') public questionAksed: ElementRef;
  @ViewChild('reply') public replyDone: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public route: ActivatedRoute,
    private noteService: NoteService,
    private qService: QuesAndAnsService,
    private router: Router) { }
  public noteId;
  public title;
  public description;
  public checklist;
  public questionStatus = false;
  public question = [];
  public questionValue;
  public isReply = false;
  URL = environment.URL;
  noteDetails: Note[] = [];
  public printId;
  public replies=[]
  public rate;
  public replyObj;
 
  starList: boolean[] = [true, true, true, true, true];       
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {

        this.noteId = params['noteId']
        console.log(this.noteId);

      })
      this.getNoteDetails();    
  }
  getNoteDetails(){
    this.noteService.getNOteDetails(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.noteDetails = response['data'].data
        console.log(this.noteDetails);
        this.title = this.noteDetails[0].title;
        if (this.noteDetails[0].description != undefined) {
          this.description = this.noteDetails[0].description;
        }
        if (this.noteDetails[0].noteCheckLists != undefined) {
          this.checklist = this.noteDetails[0].noteCheckLists
        }
        if (this.noteDetails[0].questionAndAnswerNotes !== undefined) {
          for (let i = 0; i < this.noteDetails[0].questionAndAnswerNotes.length;i++){
            this.question.push(this.noteDetails[0].questionAndAnswerNotes[i])
          }
        }
        if (this.question.length !== 0) {
          this.questionStatus = true;
        }
        if (this.question.length !== 0) {
          this.printId = this.question[0].id;    
        }
        for (let i = 1; i < this.question.length; i++) {
          if (this.question[0].id === this.question[i].parentId) {
            this.replies.push(this.question[i]);
          }
        }
    })

  }
  public imag
  public imagpath
  public rateDisp;
  imageFormation(ques){
    this.imag = ques.user.imageUrl;
    this.imagpath = this.URL + this.imag;
    let cal = ques.rate.length;
    let count = 0;
    for (let i = 0; i < cal; i++) {
      count = count + ques.rate[i].rate
    }
    this.rateDisp=count / cal
    return true;
  }
  public lykC;
  likeDisplay(ques){
    this.lykC=0;
    for (let i = 0; i < ques.like.length;i++){
      if(ques.like[i].like==true){
        this.lykC=this.lykC+1;
      }
    }
    return true;
  }
  lengthCheck(){
    if(this.question.length>1){
      return true;
    }
    return false;
  }
  public rX=[]
  hasReply(ques)
{
    this.rX=[]
    for (let i = 1; i < this.question.length; i++) {
      if (ques.id === this.question[i].parentId) {
        this.rX.push(this.question[i])
        }
    }
   return true;
}  
public rZ;
hasReplysecnd(ques){
this.rZ=[];
  for (let i = 1; i < this.question.length; i++) {
    if (ques.id === this.question[i].parentId) {
      this.rZ.push(this.question[i])

    }
  }
  return true;
}
public liked=false;
  isliked(ques){
    this.liked=false;
    for(let i=0;i<ques['like'].length;i++){
      if(ques.like[i].userId==localStorage.getItem('userId') && ques.like[i].like==true){
        this.liked=true;
        return true;
      }
    }
    return true;
   
  }
addQuestion(e) {
      if (e.keyCode === 13) {
      this.questionValue = this.questionAksed.nativeElement.innerHTML;
      this.addQuestionToNote();
      this.questionAksed.nativeElement.innerHTML = '';
    }
}
  addQuestionToNote() {
    let RequestBody = {
      "message": this.questionValue,
      "notesId": this.noteId
    }
    this.qService.addAquestion(RequestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.questionStatus = false;
        this.getNoteDetails();
      })
  }
  closeQandA() {
    this.router.navigate(['home'])
  }
  
  reply(replyOBJ) {
    this.replyObj=replyOBJ;
    console.log(this.replyObj);
    this.isReply = true;
  }
  sendReply() {
    console.log(this.replyDone.nativeElement.innerHTML);
    let RequestBody={
      "message": this.replyDone.nativeElement.innerHTML
    }
    this.qService.addReply(RequestBody,this.replyObj.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response=>{
      })
  }
  like(ques,flag){
    let requestbody={
      "like": flag
    }
    this.qService.addLike(requestbody, ques.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.liked=flag;
      })
  }
  rating1(rate,ques){
    console.log(rate);
    let request={
      "rate":rate
    }
    this.qService.addRating(request, ques.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response=>{})
  }
  // ratingDisp(ques){
  //    let cal=ques.rate.length;
  //    let count=0;
  //    for(let i=0;i<cal;i++){
  //      count = count + ques.rate[i].rate
  //    }
  //    return count/cal
  // }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
