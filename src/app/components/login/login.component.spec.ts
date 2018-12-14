import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [BrowserModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be invalid', () => {
    expect(component.model.email).toEqual('');
    expect(component.model.password).toEqual('');
    expect(component.model.email).toEqual('Aabc@gmail.com');
    expect(component.model.email).toEqual('@abc.ABC.com');
    expect(component.model.email).toEqual('AbC.23@abc.com');

    expect(component.model.email).toBeFalsy();
    expect(component.model.password).toBeFalsy();
  });
  it('should be valid', () => {
    expect(component.model.email).toEqual('abc@gmail.com');
    expect(component.model.password).toEqual('abcXYZ123');
    expect(component.model.password).toEqual('@abc123');

    expect(component.model.email).toBeTruthy();
    expect(component.model.password).toBeTruthy();
  });

});