import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteComponent } from './AddNote.component';

describe('SidebarComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#clicked() should toggle #isOn', () => {
    expect(component.collab).toBe(true, 'off at first');
    component.cancel();
    expect(component.collab).toBe(false, 'on after click');
    component.cancel();
    expect(component.collab).toBe(true, 'off after second click');
  });

});
