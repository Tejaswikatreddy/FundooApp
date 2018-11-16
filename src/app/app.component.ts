import { Component, OnInit } from '@angular/core';
import { MessageService} from './core/services/message-service/message.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'fundoo';
  public message;
  constructor(private service: MessageService){}
  ngOnInit() {
    this.service.getPermission()
  
    this.message = this.service.currentMessage
  }

}
