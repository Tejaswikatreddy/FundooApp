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
  public image 
  public imagepath 
  noteDetails: Note[] = [];
  public printQuestion;
  public printUsername;
  public printId;
  public replies=[]
  public likeCount;
  public rate;
  starList: boolean[] = [true, true, true, true, true];       
  rating: number;
  setStar(data: any) {
    this.rating = data + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= data) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }
    console.log(this.rating);
    
  }  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {

        this.noteId = params['noteId']
        console.log(this.noteId);

      })
    this.noteService.getNOteDetails(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        // console.log(response['data'].data[0].title);
        this.noteDetails = response['data'].data
        console.log(this.noteDetails);
        this.title = this.noteDetails[0].title;
        if (this.noteDetails[0].description != undefined) {
          this.description = this.noteDetails[0].description;
        }
        if (this.noteDetails[0].noteCheckLists.length != 0) {
          this.checklist = this.noteDetails[0].noteCheckLists
        }
        this.question = this.noteDetails[0].questionAndAnswerNotes
        if (this.question.length == 0) {
          this.questionStatus = true;
        }
        this.image = this.question[0].user.imageUrl;
        this.imagepath = this.URL + this.image;
        this.printQuestion = this.question[0].message
        this.printUsername = this.question[0].user.firstName;
        this.printId = this.question[0].id;
        for (let i = 1; i < this.question.length; i++) {
           if (this.printId === this.question[i].parentId) {
              this.replies.push(this.question[i])

          }
        }
        this.likeCount = this.question[0].like.length;
        console.log(this.likeCount);
        
        
      })
   
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
      })
  }
  closeQandA() {
    this.router.navigate(['home'])
  }
  reply() {
    this.isReply = true;
  }
  sendReply() {
    console.log(this.replyDone.nativeElement.innerHTML);
    let RequestBody={
      "message": this.replyDone.nativeElement.innerHTML
    }
    this.qService.addReply(RequestBody,this.question[0].id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response=>{
        console.log(response);
        
      })
  }
  like(){
    let requestbody={
      "like": true
    }
    this.qService.addLike(requestbody, this.question[0].id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        console.log(response);

      })
  }
  rating1(){
    console.log(this.rate);
    
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
