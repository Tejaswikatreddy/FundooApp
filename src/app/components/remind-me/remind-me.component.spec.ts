import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindMeComponent } from './remind-me.component';

describe('RemindMeComponent', () => {
  let component: RemindMeComponent;
  let fixture: ComponentFixture<RemindMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
