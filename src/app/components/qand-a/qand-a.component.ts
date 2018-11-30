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
  @ViewChild('question') private questionAksed: ElementRef;
  @ViewChild('reply') private replyDone: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private route: ActivatedRoute,
    private noteService: NoteService,
    private qService: QuesAndAnsService,
    private router: Router) { }
  private noteId;
  private title;
  private description;
  private checklist;
  private questionStatus = false;
  private question = [];
  private questionValue;
  private isReply = false;
  URL = environment.URL;
  noteDetails: Note[] = [];
  private replies=[]
  private rate;
  private replyObj;
 
  
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.noteId = params['noteId']
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
        
        for (let i = 1; i < this.question.length; i++) {
          if (this.question[0].id === this.question[i].parentId) {
            this.replies.push(this.question[i]);
          }
        }
    })

  }
  private imag
  private imagpath
  private rateDisp;
  private userRating
  imageFormation(ques){
  
    this.imag = ques.user.imageUrl;
    this.imagpath = this.URL + this.imag;
    return true;
  }
  private liked = false;
  isliked(ques) {
    this.liked = false;
    for (let i = 0; i < ques['like'].length; i++) {
      if (ques.like[i].userId == localStorage.getItem('userId') && ques.like[i].like == true) {
        this.liked = true;
        return true;
      }
    }
    return true;

  }

  private lykC;
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
  private rX=[]
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
private rZ;
hasReplysecnd(ques){
this.rZ=[];
  for (let i = 1; i < this.question.length; i++) {
    if (ques.id === this.question[i].parentId) {
      this.rZ.push(this.question[i])

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
      .subscribe(response=>{})
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
  ratingDisp(ques) {
    this.rateDisp=0;
    this.userRating =0;
    let cal = ques.rate.length;
    let count = 0;
    if (cal !== 0) {
      for (let i = 0; i < cal; i++) {
        count = count + ques.rate[i].rate
        if (ques.rate[i].userId === localStorage.getItem('userId')) {
          this.userRating = ques.rate[i].rate;
        }
      }

      this.rateDisp = count / cal
      console.log(this.rateDisp);

    }
    return true;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
