import { Injectable } from '@angular/core';
import { httpService } from '../httpService/http.service';
import { environment } from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class QuesAndAnsService {
  URL = environment.ApiURL;
  public url;
  constructor(private service: httpService)  { }
  addAquestion(RequestBody) {
    this.url = this.URL + "/questionAndAnswerNotes/addQuestionAndAnswer";
    return this.service.PostJson(this.url, RequestBody)
  }
  addReply(RequestBody,noteId){
    this.url = this.URL +"/questionAndAnswerNotes/reply/"+noteId
    return this.service.PostJson(this.url,RequestBody)
  }
  addLike(RequestBody,id){
    this.url = this.URL +"/questionAndAnswerNotes/like/"+id;
    return this.service.PostJson(this.url,RequestBody)
  }
}
