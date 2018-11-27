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
    expect(component).toBeTruthy();
  });
});
