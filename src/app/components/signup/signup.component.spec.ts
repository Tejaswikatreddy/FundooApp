import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [BrowserModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid', () => {
    expect(component.model.firstname).toEqual('');
    expect(component.model.lastname).toEqual('');
    expect(component.model.email).toEqual('');
    expect(component.model.password).toEqual('');

    expect(component.model.firstName).toEqual('abc123');
    expect(component.model.firstName).toEqual('aAbc');
    expect(component.model.lastName).toEqual('Abc');
    expect(component.model.lastName).toEqual('1abc12');
    expect(component.model.email).toEqual('AbC.23@abc.com');
    expect(component.model.email).toEqual('aBc12@gmail.cccccccc');
    expect(component.model.password).toEqual('aaaaaaaaaaaaaaaaaaaa');
    expect(component.model.password).toEqual('111111111111111111111111');

    expect(component.model.firstname).toBeFalsy();
    expect(component.model.lastname).toBeFalsy();
    expect(component.model.email).toBeFalsy();
    expect(component.model.password).toBeFalsy();
  });
  it('should be valid', () => {
    expect(component.model.firstname).toEqual('abcabc');
    expect(component.model.lastname).toEqual('abc');
    expect(component.model.email).toEqual('abc@xyz.com');
    expect(component.model.password).toEqual('abc@123');

    expect(component.model.firstname).toBeTruthy();
    expect(component.model.lastname).toBeTruthy();
    expect(component.model.email).toBeTruthy();
    expect(component.model.password).toBeTruthy();
  });
});

