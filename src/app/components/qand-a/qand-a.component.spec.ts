import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QandAComponent } from './qand-a.component';

describe('QandAComponent', () => {
  let component: QandAComponent;
  let fixture: ComponentFixture<QandAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QandAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QandAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    let likeArray=[{
      like:Boolean,
      userId:"hgfyuhjfgvhyj78688"
    }]
    let ques={
      like: likeArray
    }
    expect(component.isliked(ques)).toBeTruthy();
  });


  it('should create', () => {
    let likeArray = [{
      like: String,
      userId: "jyhjyuh546576678768fgf"
    }]
    let ques = {
      like: likeArray
    }
    expect(component.isliked(ques)).toBeFalsy();
  });


  it('should create', () => {
    let likeArray = [{
      like: Boolean,
      userId: localStorage.getItem('id')
    }]
    let ques = {
      like: likeArray
    }
    expect(component.likeDisplay(ques)).toBeTruthy();
  });



  it('should create', () => {
    let likeArray = [{
      like: String,
      userId: "jyhjyuh546576678768fgf"
    }]
    let ques = {
      like: likeArray
    }
    expect(component.likeDisplay(ques)).toBeFalsy();
  });



  it('#likeDisplay() should count', () => {
    let likeArray = [{
      like: Boolean,
      userId: localStorage.getItem('id')
    }]
    let ques = {
      like: likeArray
    }
    expect(component.lykC).toBe(0, 'zero at first');
    component.likeDisplay(ques);
    expect(component.lykC).toBeGreaterThanOrEqual(0, 'on after click');
  
  });



  it('should create', () => {
    component.RequestBody = {
      "message": "anyString",
    }
    expect(component.RequestBody.message.length).toBeGreaterThan(0);
    expect(component.sendReply()).toBeTruthy();
    component.RequestBody = {
      "message": "",
    }
    expect(component.RequestBody.message.length).toBeLessThanOrEqual(0);
    expect(component.sendReply()).toBeFalsy();
  });




  it('should create', () => {
    let likeArray = [{
      like: Boolean,
      userId: localStorage.getItem('id')
    }]
    let ques = {
      like: likeArray
    }
    component.RequestBody = {
      "like": Boolean,
    }
    expect(component.RequestBody.like).toBeTruthy();
    expect(component.like(ques, component.RequestBody.like)).toBeTruthy();
    component.RequestBody = {
      "like": String,
    }
    expect(component.RequestBody.message.length).toBeFalsy();
    expect(component.like(ques, component.RequestBody.like)).toBeTruthy();
  });



  it('should create', () => {
    let e={
      keyCode:Number,
    }
let RequestBody={
  "message": "vhgfdgh dhjfhdjdjhn dajhgfjhad fhkjgdhjf",
  "notesId": String
}
    expect(component.addQuestion(e)).toBeTruthy();
    e = {
      keyCode: Number,
    }
  RequestBody = {
    "message": "",
    "notesId": String
  }
    expect(component.addQuestion(e)).toBeFalsy();

  });

  it('should create', () => {
    let userDetails = [{
      imageUrl: "hjhjhj/jhyuhjh",
    
    }]
    let ques = {
      user: userDetails
    }
    expect(component.imageFormation(ques)).toBeTruthy();
    userDetails = [{
      imageUrl: "",

    }]
    ques = {
      user: userDetails
    }
    expect(component.imageFormation(ques)).toBeFalsy();
  });


  it('should create', () => {
   
    let ques = {
      id: "6767676767jhjy989we78"
    }
    expect(component.hasReply(ques)).toBeTruthy();
  
    ques = {
      id: ""
    }
    expect(component.hasReply(ques)).toBeFalsy();
  });


  it('should create', () => {

    let ques = {
      id: "6767676767jhjy989we78"
    }
    expect(component.hasReplysecnd(ques)).toBeTruthy();

    ques = {
      id: ""
    }
    expect(component.hasReplysecnd(ques)).toBeFalsy();
  });



});
