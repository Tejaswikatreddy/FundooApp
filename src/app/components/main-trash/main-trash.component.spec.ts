import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTrashComponent } from './main-trash.component';

describe('MainTrashComponent', () => {
  let component: MainTrashComponent;
  let fixture: ComponentFixture<MainTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
